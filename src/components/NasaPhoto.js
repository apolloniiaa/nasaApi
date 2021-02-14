import { useState, useEffect } from "react";
import React from "react";
import NavBar from "./NavBar";

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetchPhoto();
    async function fetchPhoto() {
      console.log(apiKey);
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
      );
      const data = await res.json();
      setPhotoData(data);
      console.log(data);
    }
  }, [date]);

  if (!photoData) return <div />;

  return (
    <div className="second-page">
      <NavBar />
      <div className="nasa-photo">
        {photoData.media_type === "image" ? (
          <img
            src={photoData.url}
            alt={photoData.title}
            className="photo"
          ></img>
        ) : (
          <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}

        <div>
          <h1>{photoData.title}</h1>
          <p className="date"> {photoData.date} </p>
          <p className="explanation"> {photoData.explanation} </p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
