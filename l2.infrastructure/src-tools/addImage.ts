export async function addImage() {
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png';
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob); // Converts the blob to base64
    reader.onloadend = function() {
        const imageElement = new Image();
        imageElement.src = reader.result as string;
        imageElement.width = 50;
        document.getElementById('imageContainer')!.appendChild(imageElement);
    }
}

