import os
import requests # pip install requests

# The authentication key (API Key).
# Get your own by registering at https://app.pdf.co
API_KEY = "2020.manas.lalwani@ves.ac.in_S8K9bic3cQ7u33jgasR5392nMh27B2K7bz94X41525sXoo42F8i588o3kiL3H229"

# Base URL for PDF.co Web API requests
BASE_URL = "https://api.pdf.co/v1"

# Direct URL of source PDF file.
# You can also upload your own file into PDF.co and use it as url. Check "Upload File" samples for code snippets: https://github.com/bytescout/pdf-co-api-samples/tree/master/File%20Upload/    
SourceFileUrl = "https://drive.google.com/file/d/14QNjUutA-zmweg0LMYBYSD-pksW_8L81/view?usp=sharing"

#Comma-separated list of page indices (or ranges) to process. Leave empty for all pages. Example: '0,2-5,7-'.
Pages = "0"

# PDF document password. Leave empty for unprotected documents.
Password = ""

# Destination PDF file name
DestinationFile = ".//result.pdf"

# Image params
Type = "image"
X = 400
Y = 700
Width = 125
Height = 50
ImageUrl = "https://res.cloudinary.com/dbqqvw3gf/image/upload/v1707575921/LegalWiseAI/digital_Signature_ejisai.png"

def main(args = None):
    addImageToExistingPdf(DestinationFile)

def addImageToExistingPdf(destinationFile):
    import json
    """Add image using PDF.co Web API"""

    # Prepare requests params as JSON
    # See documentation: https://apidocs.pdf.co
    payload = json.dumps({
        "name": os.path.basename(destinationFile),
        "password": Password,
        "url": SourceFileUrl,
        "images": [{
            "url": ImageUrl,
            "x": X,
            "y": Y,
            "width": Width,
            "height": Height,
            "pages": Pages
        }]
    })

    # Prepare URL for 'PDF Edit' API request
    url = "{}/pdf/edit/add".format(BASE_URL)

    # Execute request and get response as JSON
    response = requests.post(url, data=payload, headers={ "x-api-key": API_KEY })
    if (response.status_code == 200):
        json = response.json()

        if json["error"] == False:
            #  Get URL of result file
            resultFileUrl = json["url"]            
            # Download result file
            r = requests.get(resultFileUrl, stream=True)
            if (r.status_code == 200):
                with open(destinationFile, 'wb') as file:
                    for chunk in r:
                        file.write(chunk)
                print(f"Result file saved as \"{destinationFile}\" file.")
            else:
                print(f"Request error: {response.status_code} {response.reason}")
        else:
            # Show service reported error
            print(json["message"])
    else:
        print(f"Request error: {response.status_code} {response.reason}")

if __name__ == '__main__':
    main()

            