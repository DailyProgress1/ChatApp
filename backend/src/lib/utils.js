// import jwt from "jsonwebtoken";

// export const generateToken = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // only true in production
//     sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // for cross-origin
//   });

//   return token;
// };

// res.cookie("jwt", token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// });


// res.cookie("jwt", token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production", // ✔️ production me true
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✔️ for cross-site
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// });


import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
