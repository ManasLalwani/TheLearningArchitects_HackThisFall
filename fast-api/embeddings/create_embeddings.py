from llama_index import GPTVectorStoreIndex, GPTListIndex
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from llama_index import ServiceContext, LLMPredictor, PromptHelper
# from llama_index import LangchainEmbedding
# from langchain import OpenAI
# from embeddings import docparser




from embeddings.docparser import getdocument


def create_embeddings(filename : str,filetype:str, current_service_context) :

    document = getdocument("data/_merge"+filename,filetype)

    # create index

    vector_index = GPTVectorStoreIndex.from_documents(document,service_context=current_service_context)
    vector_index.storage_context.persist(persist_dir=f"data/{filename}_vector.json")
    vector_index.storage_context.persist(persist_dir=f"data/{filename}_vector.json")

    index = GPTListIndex.from_documents(document,service_context=current_service_context)
    index.storage_context.persist(persist_dir=f"data/{filename}_list.json")

    return vector_index,index


