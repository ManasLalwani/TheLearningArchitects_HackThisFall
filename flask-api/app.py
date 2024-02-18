import os
from flask import Flask, jsonify, render_template, request, redirect, url_for, flash
from PIL import Image
import pytesseract
from PyPDF2 import PdfReader
import docx
import fitz  # PyMuPDF
# from googletrans import Translator
from flask_cors import CORS
import openai


app = Flask(__name__)
# translator = Translator()
CORS(app)
openai.api_key = "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"

# Path to the Tesseract executable (you may need to adjust this)
pytesseract.pytesseract.tesseract_cmd = r'.\flask-backend\Tesseract-OCR\tesseract.exe'

# Function to extract text from PDF file
def extract_text_from_pdf(pdf_file):
    text = ""
    with open(pdf_file, 'rb') as pdf:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

# Function to extract text from DOCX file
def extract_text_from_docx(docx_file):
    text = ""
    doc = docx.Document(docx_file)
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

@app.route('/ocr', methods=['GET', 'POST'])
def ocr():
    if request.method == 'POST':
        # Check if an image file was uploaded
        if 'file' not in request.files:
            return "No file part"

        file = request.files['file']

        # Check if the file is empty
        if file.filename == '':
            return "No selected file"

        file_path = os.path.join('./flask-backend/uploads/', file.filename)
        file.save(file_path)
        # Check if the file is an allowed image format
        allowed_extensions = {'png', 'jpg', 'jpeg'}
        if '.' not in file.filename or file.filename.rsplit('.', 1)[1].lower() in allowed_extensions:
            # Perform OCR on the uploaded image
            image = Image.open(file)
            text = pytesseract.image_to_string(image, lang='eng')  # Change 'hin' to the appropriate language if needed
            result = {'text':text}
            return result
        elif file_path.endswith('.pdf'):
            pdf_text = extract_text_from_pdf(file_path)
            result = {'result':pdf_text}
            return result
        elif file_path.endswith('.docx'):
            docx_text = extract_text_from_docx(file_path)
            result = {'result':docx_text}
            return result

        else:
            return "invalid file"
        
       
@app.route('/scanned',methods=['POST'])
def scanned():
    file = request.files['file']
    file_path = os.path.join('./flask-backend/uploads/', file.filename)
    file.save(file_path)
    pdf_document = fitz.open(file_path)
    text=""
    for page_number in range(len(pdf_document)):
        page = pdf_document[page_number]
        # Convert the page to an image
        image = page.get_pixmap()

        # Save the image as a file (you can specify the format)
        image.save(f'./flask-backend/saved/page.png', 'png')
        image = Image.open('./flask-backend/saved/page.png')
        text += pytesseract.image_to_string(image, lang='eng') 
        result = {'result':text}
        return result
    
@app.route("/convert-text",methods=['POST'])
def convert():
    # text = request.json["text"]
    # lang = request.json["lang"]
    # # translate the text to English
    # translated_text = translator.translate(text, src='en',dest=lang)

    # # print the detected language and translated text
    # # print("Detected Language:", detected_lang)
    # print("Translated Text:", translated_text.text)

    # return {"translated_text":translated_text.text}
    print("fd")
    return {"hello":"hello"}


@app.route("/customize", methods=['POST'])
def customize():
    request_data = request.json
    user_prompt = request_data.get('user_prompt', '')
    doc = request_data.get('doc', '')

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "user", "content": user_prompt + " and keep the html tags intact " + doc}
        ]
    )
    return response

@app.route("/query", methods=['POST'])
def query():
    request_data = request.json
    user_prompt = request_data.get('user_prompt', '')
    doc = request_data.get('doc', '')

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "user", "content": user_prompt + " and use html tags for proper formatting " + doc}
        ]
    )
    return response


if __name__ == '__main__':
    app.run(debug=True)
