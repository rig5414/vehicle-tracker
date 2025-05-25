type UploadProgressCallback = (progress: number) => void;

export async function uploadVideo(
  url: string,
  formData: FormData,
  onProgress?: UploadProgressCallback
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    if (onProgress) {
      xhr.upload.onprogress = (event: ProgressEvent) => {
        const progress = (event.loaded / event.total) * 100;
        onProgress(Math.round(progress));
      };
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(new Response(xhr.response, {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }));
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error occurred while uploading"));
    };

    xhr.send(formData);
  });
}
