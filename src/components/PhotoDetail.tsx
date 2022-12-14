import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './photoDetail.scss';
import usePhoto from '../hooks/usePhoto';
const SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

type PhotoDetailProps = {
    close: () => void;
}

function PhotoDetail({ close }: PhotoDetailProps) {

    const { selectedPhoto } = usePhoto();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isFullscreen) {
            if (imgRef.current && imgRef.current.requestFullscreen) {
                imgRef.current.requestFullscreen();
            }
        }
        else {
            if (document.fullscreenElement && document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }, [isFullscreen])

    const toggleFullscreen = function () {
        setIsFullscreen(!isFullscreen);
    }

    return (
        <div className="photo-detail">
            <div className={`photo-detail-left${isFullscreen ? " full" : ""}`} onContextMenu={(e) => e.preventDefault()} ref={imgRef}>
                <div className="blur-img-wrp">
                    <img className="blur-img" src={selectedPhoto.thumbnail_path} />
                </div>
                <div className="photo-detail-img-wrp">
                    {
                        selectedPhoto.is_video ?
                            <video src={selectedPhoto.file_path} autoPlay />
                            :
                            <img src={selectedPhoto.file_path} />
                    }
                </div>
                <button className="photo-detail-btn close" onClick={close}>
                    <i className="ri-close-line"></i>
                </button>
                {/* 'ri-fullscreen-exit-fill' : 'ri-fullscreen-fill' */}
                <button className="photo-detail-btn expand" onClick={toggleFullscreen}>
                    <i className={`ri-fullscreen${isFullscreen ? "-exit-fill" : "-fill"}`}></i>
                </button>
            </div>
            <div className="photo-detail-right">
                <div className="photo-detail-infos-wrp">
                    {
                        selectedPhoto.title &&
                        <div className="photo-detail-info-unit">
                            <i className="ri-image-line"></i>
                            <p>{selectedPhoto.title}</p>
                        </div>
                    }
                    <div className="photo-detail-info-unit">
                        <i className="ri-user-fill"></i>
                        <p>{selectedPhoto.photograper}</p>
                    </div>
                    {
                        selectedPhoto.location &&
                        <div className="photo-detail-info-unit">
                            <i className="ri-road-map-fill"></i>
                            <p>{selectedPhoto.location}</p>
                        </div>
                    }
                    {
                        selectedPhoto.date &&
                        <div className="photo-detail-info-unit">
                            <i className="ri-calendar-2-fill"></i>
                            <p>{moment(selectedPhoto.date).format('YYYY-MM-DD')}</p>
                        </div>
                    }
                    {
                        selectedPhoto.equipment &&
                        <div className="photo-detail-info-unit">
                            <i className="ri-camera-line"></i>
                            <p>{selectedPhoto.equipment}</p>
                        </div>
                    }
                    {
                        selectedPhoto.exposure &&
                        <div className="photo-detail-info-unit">
                            <i className="ri-flashlight-line"></i>
                            <p>{selectedPhoto.exposure}</p>
                        </div>
                    }
                    {
                        selectedPhoto.processing &&
                        <div className="photo-detail-info-unit">
                            <i className="ri-equalizer-line"></i>
                            <p>{selectedPhoto.processing}</p>
                        </div>
                    }
                    <div className="photo-detail-info-unit">
                        <i className="ri-chat-quote-line"></i>
                        <p>{selectedPhoto.story}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoDetail;
