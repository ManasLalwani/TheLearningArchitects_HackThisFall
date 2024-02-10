from llama_index import GPTVectorStoreIndex, StorageContext, load_index_from_storage,VectorStoreIndex, get_response_synthesizer

from llama_index.retrievers import VectorIndexRetriever
from llama_index.query_engine import RetrieverQueryEngine
import os
import openai


# Set the OPENAI_API_KEY environment variable
os.environ["OPENAI_API_KEY"] = "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"


def query_qna(text,filename,current_service_context,similarity=3, verbose=False):
    openai.api_key = os.environ["OPENAI_API_KEY"]

    QA_PROMPT_TMPL = (
    """You are a large language model whose expertise is reading and summarizing documents.
        You are given a query and a series of text embeddings from a document in order of their cosine similarity to the query.
        You must take the given embeddings and return a very precise response of the document that answers the query. The response should be as short as possible.

            Given the question:  {query_str}

            and the following embeddings as data:

            {context_str}

            Return a compact and precise and most accurate answer without any unnecesary details based on the paper: """
    )
    QA_PROMPT = QuestionAnswerPrompt(QA_PROMPT_TMPL)

    print(text)

    # index = GPTVectorStoreIndex.load_from_disk(f"./data/{filename}_vector.json",
    # service_context=current_service_context)
    # storage_context = StorageContext.from_defaults(f"./data/{filename}_vector.json")
    # index = load_index_from_storage(storage_context)

    storage_context = StorageContext.from_defaults(persist_dir=f"./data/{filename}_vector.json")

    # load index
    index = load_index_from_storage(storage_context)

    # configure retriever
    retriever = VectorIndexRetriever(
        index=index,
        similarity_top_k=similarity,
        verbose=verbose,
        service_context=current_service_context
    )

    # configure response synthesizer
    response_synthesizer = get_response_synthesizer(
        response_mode="compact",
    )

    # assemble query engine
    query_engine = RetrieverQueryEngine(
        retriever=retriever,
        response_synthesizer=response_synthesizer,
    )

    # query_engine = index.as_query_engine(service_context=current_service_context, verbose=False,response_mode="compact" )

    res = query_engine.query(
        text
    )
    return res



def query_highlight(text,filename,current_service_context,similarity=3, verbose=False):

    QA_PROMPT_TMPL = (
    """You are a large language model whose expertise is reading and summarizing scientific papers.
        You are given a highlighted text and a series of text embeddings from a paper in order of their cosine similarity to the query.
        The user wants more explanation and clarification on the highlighted text.
        You must take the given embeddings and return a very detailed summary of the paper that answers the query.

            Given the Highlighted Text:  {query_str}

            and the following embeddings as data:

            {context_str}

            Return a detailed explanation based on the paper: """
    )
    QA_PROMPT = QuestionAnswerPrompt(QA_PROMPT_TMPL)

    storage_context = StorageContext.from_defaults(persist_dir=f"./data/{filename}_vector.json")

    # load index
    index = load_index_from_storage(storage_context)

    query_engine = index.as_query_engine(service_context=current_service_context, verbose=True,response_mode="compact")

    res = query_engine.query(
        text    )

    return res