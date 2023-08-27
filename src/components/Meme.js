import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/271ps6.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);

  /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
    console.log(meme);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <Container className="md-px-5">
      <main>
        <Row>
          <Col md >
            <Form.Group className="">
              <Form.Label>Top Text</Form.Label>
              <Form.Control
                name="topText"
                value={meme.topText}
                onChange={handleChange}
                placeholder="Disabled input"
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3">
              <Form.Label>Bottom Text</Form.Label>
              <Form.Control
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
                placeholder="Disabled input"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="form">
          <button className="form--button" onClick={getMemeImage}>
            Get a new meme image 🖼
          </button>
        </div>
        <Container className="xl-px-5">
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
        </Container>

      </main>
    </Container>
  );
}
