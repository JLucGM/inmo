import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const InstagramMedia = ({setting}) => {
    const [media, setMedia] = useState([]);

    useEffect(() => {
        const fetchInstagramMedia = async () => {
            const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp,caption&access_token=${setting.token_instagram}`);            
            const data = await response.json();
            setMedia(data.data.slice(0, 5));
        };
        fetchInstagramMedia();
    }, []);

    return (
        <div>
            <div className="flex justify-between">

                <h2 className="font-bold mb-4">Siguenos </h2>
                <Link
                    href={`https://instagram.com/${setting.instagram}`}
                    className="text-slate-800 text-lg font-normal mb-4 underline underline-offset-4"
                    target="_blank"
                >
                    @{setting.instagram}
                </Link>
            </div>
            <div className="grid lg:grid-flow-row-dense grid-cols-4 grid-rows-3 lg:grid-rows-2 gap-4 h-[140vh] md:h-screen-[-175]] max-h-[750px]">
                {media.length > 0 && (
                    <>
                        {/* Imagen principal ocupa 3 filas */}
                        <div className="row-span-1 col-span-4 lg:row-span-2 lg:col-span-2 relative group">
                            <a href={media[0].permalink} className='block h-full overflow-hidden' target="_blank" rel="noopener noreferrer">
                                {media[0].media_type === 'IMAGE' && (
                                    <img src={media[0].media_url} className='w-full h-full object-cover rounded-3xl' alt="Instagram Post" />
                                )}
                                {media[0].media_type === 'VIDEO' && media[0].thumbnail_url && (
                                    <img src={media[0].thumbnail_url} className='w-full h-full object-cover rounded-3xl' alt="Instagram Reel Thumbnail" />
                                )}
                                <div className="absolute inset-0 flex flex-col justify-between items-start p-5 rounded-3xl bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    <p className="text-white font-bold">{media[0].caption}</p>
                                    <p className="text-white font-bold">{new Date(media[0].timestamp).toLocaleString()}</p>
                                </div>
                            </a>
                        </div>

                        {/* Resto de las imágenes ocupan 2 columnas en dispositivos pequeños */}
                        {media.slice(1).map((item, index) => (
                            <div key={item.id} className={`relative group lg:col-span-1 col-span-2`}>
                                <a href={item.permalink} className='block h-full overflow-hidden' target="_blank" rel="noopener noreferrer">
                                    {item.media_type === 'IMAGE' && (
                                        <img src={item.media_url} className='w-full h-full object-cover rounded-3xl' alt="Instagram Post" />
                                    )}
                                    {item.media_type === 'VIDEO' && item.thumbnail_url && (
                                        <img src={item.thumbnail_url} className='w-full h-full object-cover rounded-3xl' alt="Instagram Reel Thumbnail" />
                                    )}

                                    <div className="absolute inset-0 flex flex-col justify-between items-start p-5 rounded-3xl bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                        <p className="text-white font-bold">{item.caption}</p>
                                        <p className="text-white font-bold">{new Date(item.timestamp).toLocaleString()}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default InstagramMedia;