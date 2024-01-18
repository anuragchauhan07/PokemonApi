"use client";

import { useState, useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("2");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  const fetchData = async () => {
    setData([]);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setPrev(data.previous);
    setNext(data.next);
    await console.log(data.results);
    function getdata(result) {
      result.forEach(async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await response.json();
        setData((prevData) => [...prevData, data]);
        console.log(data);
      });
    }
    getdata(data.results);
  };

  useEffect(() => {
    fetchData();
  }, [next, prev]);

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const settings2 = {
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <div className="flex  gap-4 p-10 bg-gray-900">
        <div className="grid gap-4  text-white grid-cols-1 sm:grid-cols-3 justify-items-center place-items-center ">
          {data.map((key) => {
            return (
              <div
                key={key.name}
                onClick={() => {
                  setName(key.id);
                }}
                className="flex relative w-[300px]  flex-col p-4 items-center shadow-xl rounded-md bg-gray-800"
              >
                <div>
                  <img src={key.sprites.front_default} />
                </div>
                <p className="font-semibold uppercase mb-4">{key.name}</p>
                <div className="flex gap-4 ">
                  {key.types.map((item) => {
                    return (
                      <p className="bg-green-600/80 uppercase text-white px-4 py-1 rounded text-sm">
                        {item.type.name}
                      </p>
                    );
                  })}
                </div>
                <div className="absolute m-2 right-0 top-0 text-xs w-7 h-7 flex items-center justify-center  bg-red-600 text-white  rounded-full p-1">
                  {key.base_experience}
                </div>
              </div>
            );
          })}
          <div className="flex gap-4 w-full bg-gray-800 h-48 p-4 rounded">
            <button
              className="flex gap-2  group items-center trasition duration-300 justify-center hover:bg-gray-900 hover:text-white bg-gray-600 px-4 py-2 rounded flex-1"
              onClick={() => {
                setUrl(prev);
                fetchData();
              }}
            >
              <MdSkipPrevious />
              <p>Prev</p>
            </button>

            <button
              className="flex gap-2 group items-center trasition duration-300 justify-center hover:bg-gray-900 hover:text-white bg-gray-600 px-4 py-2 rounded flex-1"
              onClick={() => {
                setUrl(next);
                fetchData();
              }}
            >
              <p>Next</p>
              <MdSkipNext />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {data.map((key) => {
            if (key.id == name) {
              return (
                <div
                  key={key.name}
                  className="flex w-[300px] bg-gray-700 text-white flex-col p-4 py-10 items-center shadow-xl rounded-md"
                >
                  <div className="w-24 m-auto">
                    <Slider {...settings}>
                      <img src={key.sprites.front_default} />
                      <img src={key.sprites.front_shiny} />
                      <img src={key.sprites.back_default} />
                      <img src={key.sprites.back_shiny} />
                    </Slider>
                  </div>
                  <p className="font-bold uppercase text-xl">{key.name}</p>
                  <div className="flex gap-4 my-4 uppercase text-sm ">
                    {key.types.map((item) => {
                      return (
                        <p className="bg-yellow-500/50 text-white px-4 py-1 rounded">
                          {item.type.name}
                        </p>
                      );
                    })}
                  </div>
                  <p className="uppercase font-semibold tracking-widest">
                    Pokedex Entry
                  </p>

                  <div className="flex justify-evenly w-full my-4">
                    <div className="flex flex-col items-center">
                      <p className="font-semibold uppercase text-sm">Height</p>
                      <p className="text-sm text-gray-800 font-semibold">
                        {key.height} m
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="font-semibold uppercase text-sm">Weight</p>
                      <p className="text-sm text-gray-800 font-semibold">
                        {key.weight} kg
                      </p>
                    </div>
                  </div>
                  <p className="uppercase font-semibold tracking-widest">
                    Abilities
                  </p>
                  <div className="flex w-full justify-evenly mt-3">
                    {key.abilities.map((item) => {
                      return (
                        <div
                          key={item.ability.name}
                          className="border bg-gray-600 hover:bg-gray-900 transition duration-300 cursor-pointer rounded-3xl px-4 py-2 w-32 text-center"
                        >
                          <p>{item.ability.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-40 m-auto h-10 my-6">
                    <Slider {...settings2}>
                      {key.moves.map((item) => {
                        return (
                          <div
                            key={item.move.name}
                            className=" border-b w-full text-center text-gray-300 rounded-sm px-4 py-2"
                          >
                            <p>{item.move.name}</p>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                  <div className="flex gap-4 mb-2">
                    <p className="font-semibold uppercase text-sm">
                      Base Experience :
                    </p>
                    <p className="text-sm">{key.base_experience}</p>
                  </div>

                  <p className="uppercase font-semibold tracking-widest">
                    Stats
                  </p>
                  <div className="flex gap-2 mt-2">
                    {key.stats.map((item) => {
                      return (
                        <div
                          key={item.stat.name}
                          className="flex flex-col items-center "
                        >
                          <div className="bg-red-600 text-white rounded-full p-1 text-sm flex items-center">
                            <p className=" w-4 overflow-hidden h-4 ">
                              {item.stat.name}
                            </p>
                          </div>
                          <p className="text-sm">{item.base_stat}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 mt-6 w-full">
                    <button
                      className="flex gap-2 group items-center trasition duration-300 justify-center hover:bg-gray-900 hover:text-white bg-gray-600 px-4 py-2 rounded flex-1"
                      onClick={() => {
                        setName(name + 1);
                      }}
                    >
                      <MdSkipPrevious />
                      <p>Prev</p>
                    </button>

                    <button
                      className="flex gap-2 group items-center trasition duration-300 justify-center hover:bg-gray-900 hover:text-white bg-gray-600 px-4 py-2 rounded flex-1"
                      onClick={() => {
                        setName(name + 1);
                      }}
                    >
                      <p>Next</p>
                      <MdSkipNext />
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
