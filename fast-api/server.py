# FASTAPI requirements
import uvicorn
# from googletrans import Translator
from fastapi import FastAPI, Request, File, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
# from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader, GPTListIndex
# QuestionAnswerPrompt
# from llama_index.indices.composability import ComposableGraph

from pydantic import BaseModel
from typing import Annotated, List
# from llama_index import download_loader, ServiceContext
from PyPDF2 import PdfMerger




# Other requirements
import shutil
import pathlib
import os
from pathlib import Path
import markdown2
import pdfkit
import glob
import time
import os


# Custom modules
# import embeddings
# from llama_index.embeddings import LangchainEmbedding

#####



#init APP
app = FastAPI()
# translator = Translator()
origins = [
    "*"
]
#handle cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#idk what this does
class PDFModel(BaseModel):
    file: UploadFile = File(...)



#what are you doing on this route?
@app.get("/")
async def root() :
    return {"helo world"}




current_filename = None
current_filetype = None
current_vector_index = None
current_index = None
current_service_context = None
similarity=None


# def remove_file_with_retry(file_path, max_attempts=5, retry_delay=1):
#     attempts = 0
#     while attempts < max_attempts:
#         try:
#             os.remove(file_path)
#             # if os.path.exists(file_path):
#             #     os.remove(file_path)
#             # else:
#             #     print(f"The file {file_path} does not exist.")
#             break  # File removal succeeded, exit the loop
#         except PermissionError:
#             # File is still locked, wait and retry
#             time.sleep(retry_delay)
#             attempts += 1
#     else:
#         raise Exception(f"Failed to remove the file: {file_path}")
# def remove_file_with_retry(file_path, max_retry=3, retry_interval=1):
#     retry_count = 0
#     while retry_count < max_retry:
#         try:
#             os.remove(file_path)
#             print(f"File '{file_path}' removed successfully.")
#             return
#         except FileNotFoundError:
#             print(f"File '{file_path}' not found.")
#             return  # No need to retry if file is not found
#         except Exception as e:
#             print(f"Error occurred while removing '{file_path}': {e}")
#             retry_count += 1
#             print(f"Retrying in {retry_interval} second(s)...")
#             time.sleep(retry_interval)
#     print(f"Failed to remove '{file_path}' after {max_retry} attempts.")


#initial processing of document
@app.post("/process")
async def process(filetype: str = Form(),
    files: List[UploadFile] = File(),
    embed_model: str = Form(),
    llm_model: str = Form(),
    ocr: str = Form()) :

    # image = Request.files["file"]
    filenames = [uploaded_file.filename for uploaded_file in files]
    print(filenames)

    # redundant = glob.glob('./data/*')
    # for r in redundant :
    #     remove_file_with_retry(r)

    # redundant = glob.glob('./data/*')
    # for r in redundant :
    #     remove_file_with_retry(r)

#     redundant_current_active = glob.glob('./current_active/*')
#     for r in redundant_current_active:
#         remove_file_with_retry(r)

# # Remove files in './data/' directory
#     redundant_data = glob.glob('./data/*')
#     for r in redundant_data:
#         remove_file_with_retry(r)

    merger = PdfMerger()

    for file in files :
        with open(f"current_active/_merge{file.filename}", "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    for item in os.listdir('./current_active/'):
        if item.startswith('_merge'):
            if ocr == "true" :
                print("inside ocr")
                embeddings.get_ocr_done(item)
            merger.append('./current_active/' + item)
            # os.remove('./current_active/' + item)

    merger.write('./current_active/' + 'merged.pdf')
    # merger.write(f'./current_active/_merge{file.filename}'+ 'merged.pdf')
    merger.close()
    global current_filename, current_filetype, current_service_context, current_index, current_vector_index,similarity
    if llm_model=="Openai" :
        similarity=1
    current_service_context = embeddings.get_service_context(embed_model, llm_model)
    current_filename = "merged.pdf"
    current_filetype = filetype




    #create embeddings
    current_vector_index,current_index = embeddings.create_embeddings(current_filename, current_filetype, current_service_context)


    #return {"Embeddings created for file ":"done"}
    return {"response":"Embeddings created for given file"}








#ask questions on processed document
@app.post("/queryqna")
async def query(query : Annotated[str, Form()]):

    res = embeddings.query_qna(query,current_filename,current_service_context,similarity)

    print(res)

    return res

@app.post("/queryhighlight")
async def query(query : Annotated[str, Form()], context : Annotated[str, Form()]):

    print("queryhighlight called")
    res = embeddings.query_highlight(query,current_filename,current_service_context,similarity)


    return res





# summarize processed document
@app.post("/summarize")
async def summarize():

    if current_index is None :
        return {"Error":"No file currently processed"}

    res = embeddings.summarize_doc(current_index,current_service_context)

    return res

@app.post("/summarizequery")
async def summarizequery(query : Annotated[str, Form()]):

    if current_index is None :
        return {"Error":"No file currently processed"}

    res = embeddings.summarizequery_query(query,current_index)

    return res

# To get a topic from user and load papers
@app.post("/arxiv")
async def arxiv(topic:  Annotated[str, Form()]):
    ArxivReader = download_loader("ArxivReader")
    loader = ArxivReader()
    document = loader.load_data(search_query=topic, max_results=5)

    index = GPTVectorStoreIndex.from_documents(document,service_context=current_service_context)
    index.save_to_disk(f"./data/arxiv.json") # Will create a file
    return {"response" : "Papers loaded"}

@app.post("/arxiv_query")
async def arxiv_query(question : Annotated[str, Form()]):
    index = GPTVectorStoreIndex.load_from_disk(f"./data/arxiv.json", service_context=current_service_context)
    res=index.query(question, similarity_top_k=3,verbose=True,response_mode="compact")

    return res

# submit a url and convert to the index
@app.post("/url")
async def url(link:Annotated[str, Form()]):
    if link.find('youtube') != -1:
        YoutubeTranscriptReader = download_loader("YoutubeTranscriptReader")
        loader = YoutubeTranscriptReader()
        document = loader.load_data([link])
        index = GPTVectorStoreIndex.from_documents(document,service_context=current_service_context)
        # index = GPTListIndex.from_documents(document,service_context=current_service_context)

    else:
        SimpleWebPageReader = download_loader("SimpleWebPageReader")
        loader = SimpleWebPageReader()
        document = loader.load_data([link])
        index = GPTVectorStoreIndex.from_documents(document,service_context=current_service_context)
        # index = GPTListIndex.from_documents(document,service_context=current_service_context)
    index.storage_context.persist(persist_dir=f"./data/url.json")

    return {"response" : "URL loaded"}

# ask a question from the submited url
@app.post("/url_query")
async def url_query(question: Annotated[str, Form()]):
    index = GPTVectorStoreIndex.load_from_disk(f"./data/url.json", service_context=current_service_context)
    res=index.query(question, similarity_top_k=3, verbose=True,response_mode="compact")
    return res

@app.post("/md")
async def md(md_file: UploadFile = File(...)):
    # with open(md_file, 'r') as file:
    #     markdown_contents = file.read()
    with open(f"current_active/{md_file.filename}", "wb") as buffer:
        shutil.copyfileobj(md_file.file, buffer)
    with open(f"current_active/{md_file.filename}", 'r') as file:
        markdown_contents = file.read()
    html_contents = markdown2.markdown(markdown_contents)
    file=pdfkit.from_string(html_contents, f"./current_active/md_pdf.pdf")
    filetype='pdf'
    embed_model="HF"
    llm_model="OpenAI"
    global current_filename, current_filetype, current_service_context
    current_service_context = embeddings.get_service_context(embed_model, llm_model)
    current_filename = "md_pdf.pdf"
    current_filetype = "pdf"

    index = embeddings.create_embeddings(current_filename, current_filetype, current_service_context)

    return {"Markdown upload":"Success"}


@app.post("/md_query")
async def md_query(query : Annotated[str, Form()]):

    print(current_filename)
    res = embeddings.query_qna(query,current_filename,current_service_context)

    return res


@app.post("/convert-text")
async def convert(text : Annotated[str, Form()], lang : Annotated[str, Form()]):

    # translate the text to English
    translated_text = translator.translate(text, src='en',dest=lang)

    # print the detected language and translated text
    # print("Detected Language:", detected_lang)
    print("Translated Text:", translated_text.text)

    return {"translated_text":translated_text.text}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

# ////////////////////////////////////

# # FASTAPI requirements
# # import uvicorn
# # # from googletrans import Translator
# # from fastapi import FastAPI, Request, File, UploadFile, Form
# # from fastapi.responses import FileResponse
# # from fastapi.middleware.cors import CORSMiddleware
# # from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader, GPTListIndex
# # from llama_index.indices.composability import ComposableGraph

# # from pydantic import BaseModel
# # from typing import Annotated, List
# # from llama_index import download_loader, ServiceContext
# # from PyPDF2 import PdfMerger




# # # Other requirements
# # import shutil
# # import pathlib
# # import os
# # from pathlib import Path
# # import markdown2
# # import pdfkit
# # import glob
# # import time


# # # Custom modules
# # # from llama_index.embeddings import LangchainEmbedding
# # import embeddings
# # #####



# # #init APP
# # app = FastAPI()
# # # translator = Translator()
# # origins = [
# #     "*"
# # ]
# # #handle cors
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=origins,
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )


# # #idk what this does
# # class PDFModel(BaseModel):
# #     file: UploadFile = File(...)



# # #what are you doing on this route?
# # @app.get("/")
# # async def root() :
# #     return {"helo world"}




# # current_filename = None
# # current_filetype = None
# # current_vector_index = None
# # current_index = None
# # current_service_context = None
# # similarity=None


# # def remove_file_with_retry(file_path, max_attempts=5, retry_delay=1):
# #     attempts = 0
# #     while attempts < max_attempts:
# #         try:
# #             os.remove(file_path)
# #             break  # File removal succeeded, exit the loop
# #         except PermissionError:
# #             # File is still locked, wait and retry
# #             time.sleep(retry_delay)
# #             attempts += 1
# #     else:
# #         raise Exception(f"Failed to remove the file: {file_path}")


# # #initial processing of document
# # @app.post("/process")
# # async def process(filetype: str = Form(),
# #     files: List[UploadFile] = File(),
# #     embed_model: str = Form(),
# #     llm_model: str = Form(),
# #     ocr: str = Form()) :

# #     # image = Request.files["file"]
# #     filenames = [uploaded_file.filename for uploaded_file in files]
# #     print(filenames)

# #     # redundant = glob.glob('./current_active/*')
# #     # for r in redundant :
# #     #     remove_file_with_retry(r)

# #     # redundant = glob.glob('./data/*')
# #     # for r in redundant :
# #     #     remove_file_with_retry(r)

# #     merger = PdfMerger()

# #     for file in files :
# #         # with open(f"data/_merge{file.filename}", "wb") as buffer:
# #         #     shutil.copyfileobj(file.file, buffer)
# #         with open(f"data/_merge{file.filename}", "wb") as buffer:
# #             shutil.copyfileobj(file.file, buffer)

# #     for item in os.listdir('data/'):
# #         if item.startswith('_merge'):
# #             if ocr == "true" :
# #                 print("inside ocr")
# #                 embeddings.get_ocr_done(item)
# #             merger.append('data/' + item)
# #             # os.remove('.fast-api/data/' + item)

# #     merger.write('data/' + 'merged.pdf')
# #     merger.close()
# #     global current_filename, current_filetype, current_service_context, current_index, current_vector_index,similarity
# #     if llm_model=="Openai" :
# #         similarity=1
# #     current_service_context = embeddings.get_service_context(embed_model, llm_model)
# #     current_filename = "merged.pdf"
# #     current_filetype = filetype

# #     #create embeddings
# #     current_vector_index,current_index = embeddings.create_embeddings(current_filename, current_filetype, current_service_context)


# #     #return {"Embeddings created for file ":"done"}
# #     return {"response":"Embeddings created for given file"}








# # #ask questions on processed document
# # @app.post("/queryqna")
# # async def query(query : Annotated[str, Form()]):

# #     res = embeddings.query_qna(query,current_filename,current_service_context,similarity)

# #     print(res)

# #     return res

# # @app.post("/queryhighlight")
# # async def query(query : Annotated[str, Form()], context : Annotated[str, Form()]):

# #     print("queryhighlight called")
# #     res = embeddings.query_highlight(query,current_filename,current_service_context,similarity)


# #     return res





# # # summarize processed document
# # @app.post("/summarize")
# # async def summarize():

# #     if current_index is None :
# #         return {"Error":"No file currently processed"}

# #     res = embeddings.summarize_doc(current_index,current_service_context)

# #     return res

# # @app.post("/summarizequery")
# # async def summarizequery(query : Annotated[str, Form()]):

# #     if current_index is None :
# #         return {"Error":"No file currently processed"}

# #     res = embeddings.summarizequery_query(query,current_index)

# #     return res

# # # To get a topic from user and load papers
# # @app.post("/arxiv")
# # async def arxiv(topic:  Annotated[str, Form()]):
# #     ArxivReader = download_loader("ArxivReader")
# #     loader = ArxivReader()
# #     document = loader.load_data(search_query=topic, max_results=5)

# #     index = GPTVectorStoreIndex.from_documents(document,service_context=current_service_context)
# #     index.save_to_disk(f"./data/arxiv.json") # Will create a file
# #     return {"response" : "Papers loaded"}

# # @app.post("/arxiv_query")
# # async def arxiv_query(question : Annotated[str, Form()]):
# #     index = GPTVectorStoreIndex.load_from_disk(f"./data/arxiv.json", service_context=current_service_context)
# #     res=index.query(question, similarity_top_k=3,verbose=True,response_mode="compact")

# #     return res

# # # submit a url and convert to the index
# # @app.post("/url")
# # async def url(link:Annotated[str, Form()]):
# #     if link.find('youtube') != -1:
# #         YoutubeTranscriptReader = download_loader("YoutubeTranscriptReader")
# #         loader = YoutubeTranscriptReader()
# #         document = loader.load_data([link])
# #         index = GPTVectorStoreIndex.from_documents(document,service_context=current_service_context)
# #         # index = GPTListIndex.from_documents(document,service_context=current_service_context)

# #     else:
# #         SimpleWebPageReader = download_loader("SimpleWebPageReader")
# #         loader = SimpleWebPageReader()
# #         document = loader.load_data([link])
# #         index = GPTVectorStoreIndex.from_documents(document,service_context=current_service_context)
# #         # index = GPTListIndex.from_documents(document,service_context=current_service_context)
# #     index.storage_context.persist(persist_dir=f"./data/url.json")

# #     return {"response" : "URL loaded"}

# # # ask a question from the submited url
# # @app.post("/url_query")
# # async def url_query(question: Annotated[str, Form()]):
# #     index = GPTVectorStoreIndex.load_from_disk(f"./data/url.json", service_context=current_service_context)
# #     res=index.query(question, similarity_top_k=3, verbose=True,response_mode="compact")
# #     return res

# # @app.post("/md")
# # async def md(md_file: UploadFile = File(...)):
# #     # with open(md_file, 'r') as file:
# #     #     markdown_contents = file.read()
# #     with open(f"data/{md_file.filename}", "wb") as buffer:
# #         shutil.copyfileobj(md_file.file, buffer)
# #     with open(f"data/{md_file.filename}", 'r') as file:
# #         markdown_contents = file.read()
# #     html_contents = markdown2.markdown(markdown_contents)
# #     file=pdfkit.from_string(html_contents, f"./data/md_pdf.pdf")
# #     filetype='pdf'
# #     embed_model="HF"
# #     llm_model="OpenAI"
# #     global current_filename, current_filetype, current_service_context
# #     current_service_context = embeddings.get_service_context(embed_model, llm_model)
# #     current_filename = "md_pdf.pdf"
# #     current_filetype = "pdf"

# #     index = embeddings.create_embeddings(current_filename, current_filetype, current_service_context)

# #     return {"Markdown upload":"Success"}


# # @app.post("/md_query")
# # async def md_query(query : Annotated[str, Form()]):

# #     print(current_filename)
# #     res = embeddings.query_qna(query,current_filename,current_service_context)

# #     return res


# # @app.post("/convert-text")
# # async def convert(text : Annotated[str, Form()], lang : Annotated[str, Form()]):

# #     # translate the text to English
# #     translated_text = translator.translate(text, src='en',dest=lang)

# #     # print the detected language and translated text
# #     # print("Detected Language:", detected_lang)
# #     print("Translated Text:", translated_text.text)

# #     return {"translated_text":translated_text.text}


# # if __name__ == "__main__":
# #     uvicorn.run(app, host="0.0.0.0", port=8000)



# from fastapi import FastAPI, HTTPException
# from typing import Dict

# # Importing required modules
# from PyPDF2 import PdfReader
# import torch
# import torch.nn as nn
# import torch.nn.functional as F
# from transformers import GPT2Tokenizer
# from transformers import GPT2LMHeadModel, GPT2Config

# # from index import text
# # Create a FastAPI instance
# app = FastAPI()

# class GPT2Simple(nn.Module):
#     def __init__(self, vocab_size, d_model, nhead, num_layers):
#         super(GPT2Simple, self).__init__()
#         self.embedding = nn.Embedding(vocab_size, d_model)
#         self.transformer = nn.Transformer(
#             d_model=d_model, nhead=nhead, num_encoder_layers=num_layers
#         )
#         self.fc = nn.Linear(d_model, vocab_size)

#     def forward(self, x):
#         x = self.embedding(x)
#         output = self.transformer(x, x)
#         output = self.fc(output)
#         return output

# # @app.post('/receive_variable')
# # async def receive_variable(variable: str):
# #     # Process the received variable
# #     print('Received variable from Flask:', text)
# #     return {'message': 'Variable received'}


# @app.get('/import_variable')
# async def import_variable():
#     with open('../flask-api/flask_variable.json', 'r') as f:
#         data = json.load(f)
#         fastapi_variable = data['variable']
#     return {'variable': fastapi_variable}


# class CustomGPT2Simple(nn.Module):
#     def __init__(self, config):
#         super(CustomGPT2Simple, self).__init__()
#         self.transformer = GPT2LMHeadModel(config)

#     def forward(self, variable, **kwargs):
#         return self.transformer(variable, **kwargs)
    
# # Parameters
# vocab_size = 10000  # Example vocabulary size
# d_model = 256      # Model's hidden dimension
# nhead = 8          # Number of attention heads
# num_layers = 6     # Number of transformer layers

# # Create the model
# # model = CustomGPT2Simple(vocab_size)
# model = GPT2LMHeadModel.from_pretrained(CustomGPT2Simple)
# # Load the tokenizer
# tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

# # Set the model in evaluation mode
# model.eval()
# # encoder_layer = model.transformer.h[0]  # Assuming GPT2 model has `transformer` attribute

# # # Setting batch_first=True in the self-attention mechanism
# # encoder_layer.self_attn.batch_first = True
# # config = model.config

# # # Setting batch_first=True in the configuration
# # config.attention_type = "torch.nn.MultiheadAttention"
# # config.batch_first = True

# # Update the model configuration
# # model = GPT2LMHeadModel.from_pretrained(model.config, config=config)
# # Check if GPU is available


# # encoder_layer = model.transformer.encoder.layers[0]  # Assuming GPT2 model has `transformer` attribute

# # # Setting batch_first=True in the self-attention mechanism
# # encoder_layer.self_attn.batch_first = True


# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model.to(device)

# # Define a function to generate text based on a prompt
# def generate_text(prompt, max_length=50, temperature=1.0):
#     with torch.no_grad():
#         tokenized_prompt = torch.tensor([tokenizer.encode(prompt)])
#         tokenized_prompt = tokenized_prompt.to(device)
#         output = tokenized_prompt

#         for _ in range(max_length):
#             logits = model(output)  # Get logits for the next token
#             logits = logits[:, -1, :] / temperature  # Apply temperature
#             next_token = torch.multinomial(F.softmax(logits, dim=-1), num_samples=1)
#             output = torch.cat((output, next_token), dim=1)

#         generated_text = tokenizer.decode(output[0].tolist(), skip_special_tokens=True)
#         return generated_text

# @app.post("/generate_text")
# async def generate_text_endpoint(data: Dict[str, str]):
#     prompt = data.get("prompt")
#     if not prompt:
#         raise HTTPException(status_code=400, detail="Prompt is required")
    
#     # Generate text using the provided prompt
#     generated_output = generate_text(prompt, max_length=100, temperature=0.7)

#     return {"generated_text": generated_output}
