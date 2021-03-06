import { useState } from 'react';
import Head from 'next/head';
import styled from "styled-components";
import { Button } from '../src/components/Button';
import axios from 'axios';

export default function Home() {
  const Wrapper = styled.div``;

  const List = styled.ul`
    list-style-type: none;
    max-width: 1000px;
    margin: 0 auto;
  `;

  const Item = styled.li`
    border-top: 1px solid #d4d4d4;
    &:first-child {
      border-top: 0;
    }
  `;

  const Link = styled.a`
    display: block;
    padding: 12px 0;
    font-size: 18px;
    margin: 0;

    &:link, &:visited {
      color: #000;
      text-decoration: none;
    }
    &:hover {
      text-decoration: underline;
    }
  `;


  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const getQiitaPosts = async (searchText) => {
    setIsLoading(true);
    const token = "5a1c3a81509f92549bf8ab2e6cf5648a0c1c379d";
    await axios.get('https://qiita.com/api/v2/items', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        "page": "1",
        "per_page": "20",
        "query": searchText,
      }
    })
    .then((response) => {
      setArticles(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <List>
          {
            articles && articles.map((article, _key) => (      
              <Item key={_key}>
                <Link href={article.url} target="new">{article.title}</Link>
              </Item>
            ))
          }
        </List>

        {isLoading && <div>loading..</div>}

        <input type="text" name="name" onBlur={(e) => {
          setInputValue(e.target.value);
        }} />

        <Button text="???????????????" callBack={() => {
          getQiitaPosts(inputValue)
        }} />
      </Wrapper>
    </>
  )
}
