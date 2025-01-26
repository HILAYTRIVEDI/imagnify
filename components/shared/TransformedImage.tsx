"use client"

import Image from "next/image"
import { CldImage, getCldImageUrl } from "next-cloudinary"
import { dataUrl, debounce, download, getImageSize } from "@/lib/utils"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"


const TransformedImage = ({ image, type, title, isTransforming, setIsTransforming, transformationConfig, hasDownload = false }: TransformedImageProps) =>
{
    const downloadHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        download(getCldImageUrl({
            width:image?.width,
            height:image?.height,
            src: image?.publicId,
            ...transformationConfig
        }), title);
     }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex-between">
                <h3 className="h3-bold text-dark-600">
                    Transformed
                </h3>
                {
                    hasDownload && (
                        <button className="download-btn" onClick={downloadHandler}>
                            <Image src="/assets/icons/download.svg" width={24} height={24} alt="Download" className="pb-[6px]" />
                        </button>
                    )
                }
            </div>
            {
                image?.publicId && transformationConfig ? (
                    <div className="relative">
                        <CldImage
                            width={getImageSize(type, image, "width")}
                            height={getImageSize(type, image, "height")}
                            alt={image?.title}
                            src={image?.publicId}
                            sizes={"(max-width: 768px) 100vw, 768px"}
                            placeholder={dataUrl as PlaceholderValue}
                            className="transformed-image"
                            onLoad={() => setIsTransforming && setIsTransforming(false)}
                            onError={() => debounce(() => setIsTransforming && setIsTransforming(false), 8000)()}
                            {...transformationConfig}
                        />
                        {
                            isTransforming && (
                                <div className="transforming-loader">
                                    <Image src="/assets/icons/spinner.svg" width={50} height={50} alt="Loader" />
                                    <p className="text-white/80  ">Please Wait..</p>
                                </div>
                            )
                        }
                    </div>
                ) :
                    <div className="transformed-placeholder">
                        Transformed Image
                    </div>
            }
        </div>
    )
}

export default TransformedImage