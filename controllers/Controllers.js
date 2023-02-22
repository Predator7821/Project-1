import {actors,movies,singleMovie,premiums,users} from '../services/Services.js'

export const actorsController = async (req, res) => {
    try {
      const data = await actors()
      res.status(200).send(data);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }

  export const movieController = async (req, res) => {
    try {
      const data = await movies()
      res.status(200).send(data);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }

  export const premiumController = async (req, res) => {
    try {
      const data = await premiums()
      res.status(200).send(data);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }

  export const userController = async (req, res) => {
    try {
      const data = await users()
      res.status(200).send(data);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }

  export const singleMovieController = async (req, res) => {
    try {
      const movie = await singleMovie(req.params.movieid)
      if (!movie) {
        res.status(404).send({ message: "no such movie in the DB" });
      }
      res.send(movie);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }