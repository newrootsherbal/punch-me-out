"use client";

import { useState } from "react";

/** Johnny Paycheck - "Take This Job And Shove It": what plays on the main page. */
const DEFAULT_VIDEO = "https://www.youtube.com/embed/gj2iGAifSNI?autoplay=1";
/** Dolly Parton - "9 To 5": the song the toggle button switches to. */
const LINDSAY_VIDEO =
  "https://www.youtube.com/embed/UbxUSsFXYo4?si=Tgx5Z2GLnIY0Wz8R&autoplay=1";
const DEFAULT_MESSAGE =
  "Because of Lindsay, you may now choose this song instead...";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Video that plays when the modal opens (and after "Switch back"). */
  defaultVideo?: string;
  /** Text shown in the modal. */
  message?: string;
  /** Whether to show the "Play Lindsay's song" / "Switch back" toggle. */
  showSongToggle?: boolean;
}

export default function VideoModal({
  isOpen,
  onClose,
  defaultVideo = DEFAULT_VIDEO,
  message = DEFAULT_MESSAGE,
  showSongToggle = true,
}: VideoModalProps) {
  const [videoSrc, setVideoSrc] = useState(defaultVideo);

  if (!isOpen) return null;

  const isLindsaySong = videoSrc === LINDSAY_VIDEO;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-[800px] max-w-[90vw]">
        <div className="relative pb-[56.25%] h-0">
          <iframe
            key={videoSrc}
            className="absolute top-0 left-0 w-full h-full"
            src={videoSrc}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-gray-700 text-sm">{message}</p>
          {showSongToggle && (
            <button
              onClick={() =>
                setVideoSrc(isLindsaySong ? defaultVideo : LINDSAY_VIDEO)
              }
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {isLindsaySong ? "Switch back" : "Play Lindsay's song"}
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
