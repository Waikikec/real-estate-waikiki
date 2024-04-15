import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get all users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get current user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId; //attached inside verifyToken.js
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId)
    return res.status(403).json({ message: "Not Authorized!" });

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId; //attached inside verifyToken.js

  if (id !== tokenUserId)
    return res.status(403).json({ message: "Not Authorized!" });

  try {
    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId; //attached inside verifyToken.js

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res.status(200).json({ message: "Post removed from favourites!" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      return res.status(200).json({ message: "Post added to favourites!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });

    const savedPosts = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const filterSavedPosts = savedPosts.map((item) => item.post);
    return res.status(200).json({ userPosts, filterSavedPosts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get user posts!" });
  }
};

export const getNotifications = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });

    return res.status(200).json(number);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get notifications!" });
  }
};
