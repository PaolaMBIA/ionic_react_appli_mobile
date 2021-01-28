import { CameraResultType, CameraSource, Capacitor, FilesystemDirectory } from "@capacitor/core";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
import { useStorage } from '@ionic/react-hooks/storage';
import { useCamera } from "@ionic/react-hooks/camera";
import { useEffect, useState } from "react";
import { isPlatform } from "@ionic/react";
const PHOTO_STORAGE = "photos";


export const usePhotoGallery = () => {
    
    const { getPhoto } = useCamera();
    const [photo, setPhoto] = useState([]);
    const { writeFile, deleteFile, readFile, getUri } = useFilesystem();
    const { get, set } = useStorage();

    
    useEffect(() => {
        const loadLocalPhotos = async () => {
            const photoString = await get(PHOTO_STORAGE);
            const localPhotos = photoString ? JSON.parse(photoString) : [];
            if (!isPlatform('hybrid')) {
                for (let photo of localPhotos) {
                    const file = await readFile({
                        path: photo.filepath,
                        directory: FilesystemDirectory.Data
                    });
                    photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
                }
            }
            setPhoto(localPhotos);
        };
        loadLocalPhotos();
        
        
    }, [get, readFile]);

    const savePicture = async (photo, fileName) => {
        let base64Data;
        if (isPlatform('hybrid')) {
            const file = await readFile({
                path: photo.path
            });
            base64Data = file.data;
        }
        else {
            base64Data = await base64FromPath(photo.webPath);
        }
        ;
        const saveFile = await writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        });
        if (isPlatform('hybrid')) {
            // Display the new image by rewriting the 'file://' path to HTTP
            // Details: https://ionicframework.com/docs/building/webview#file-protocol
            return {
                filepath: saveFile.uri,
                webviewPath: Capacitor.convertFileSrc(saveFile.uri),
            };
        }
        else {
            // Use webPath to display the new image instead of base64 since it's
            // already loaded into memory
            return {
                filepath: fileName,
                webviewPath: photo.webPath
            };
        }
    };

    const takePhoto = async () => {
        
        const fileName = new Date().getTime() + ".jpeg";
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        const newPhoto = {
            filepath: fileName,
            webviewPath: cameraPhoto.webPath,
        };
        setPhoto(photo => [...photo, newPhoto]);
        set(PHOTO_STORAGE, JSON.stringify([...photo, newPhoto]));
    };
    return { takePhoto: takePhoto, photo: photo };
};