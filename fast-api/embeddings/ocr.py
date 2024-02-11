import ocrmypdf

def get_ocr_done(file):
    ocrmypdf.ocr(f"./data/{file}", f"./data/{file}", deskew=True)