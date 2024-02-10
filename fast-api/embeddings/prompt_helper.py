from llama_index import PromptHelper

max_input_size = 4096
num_output = 2048

chunk_size_limit = 256+128
# max_chunk_overlap = 30
chunk_overlap_ratio = 0.3
prompt_helper = PromptHelper(max_input_size, num_output, chunk_overlap_ratio, chunk_size_limit=chunk_size_limit)
