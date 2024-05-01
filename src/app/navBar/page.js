// ImageGallery.js

import React from "react";

const Navbar = () => {
  // Generate image URLs or provide actual image URLs
  const imageUrls = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4DIUOqH1YM61Ox-lqD3182LL8VCaAZWAfx5EwaACVXA&s",
    "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1pd-BYqknYhHyLcTz2BQ8qrCRpKT0GBoBqqr7hZSygsob-qeYk8WhtL6CXoMGEhgrsI&usqp=CAU",
    "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmRTIpOZu27HvsQ4CmS7C2WafgFdT3X952XUAlA9zG6W-b0pZwt64cIHDheHlOt0D9LkY&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdLNLl76JAzu6NGbkOGcABN0ffLuMV996cj-mmpHyohkhkB3wOJPT_WrPgi7uPzLpias8&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO748DBCodAHv8xug6QiVy_RidS3LXzN8MCkOEcc9amjRuVijENPXaiTU5j5r_bdGjybo&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToWdVHs5-ji6_io8hYgb8Qp85DP-UWazOXMr8q23nnJF-goK97byFVBqFkgLP8FDCtFn4&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdgW0pCiLdTZsxUMZzbN7GXEDAPZCtPJ8bVaDGOhAFJbPHsekSDIbkPeu_r-ffpxpPAuU&usqp=CAU",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        paddingLeft: "400px",
      }}
    >
      {imageUrls.map((imageUrl, index) => (
        <img
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            border: "2px solid green",
            margin: "5px",
          }}
          //   width={60}
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Navbar;
