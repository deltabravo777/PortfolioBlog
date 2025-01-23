import * as React from 'react'
//@ts-ignore
import axios from 'axios';
import { aspnetUrl } from '../../environment/environment';
import { deepClone } from '../../utility/deepClone';
import { BlogArticle } from '../../models/blog/blog-article/BlogArticle';
import { MainInterface } from '../../models/main-interface/MainInterface';

const ArticlesFunc = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const FetchAllArticles = async () => {
        try {
            const response = await axios.get(`${aspnetUrl}/api/Article/GetAllArticles`); // Replace 'controller-name' with your actual controller route
            console.log(response.data);

            //let copyMain = deepClone(mainInterface);
            //copyMain.articleObject.articles = response.data;
            //copyMain.articleObject.articles.sort((a: BlogArticle, b: BlogArticle) => b.rank - a.rank);
            //setMainInterface(copyMain);
            setMainInterface(prevState => {
                const copyMain = deepClone(prevState); // Clone the latest state
                copyMain.articleObject.articles = response.data; // Update articles
                copyMain.articleObject.articles.sort((a: BlogArticle, b: BlogArticle) => b.rank - a.rank); // Sort articles
                return copyMain; // Return updated state
            });

            return response.data
            //setArticles(response.data); // Assuming response data is the list of articles
        } catch (error) {
            console.error('Error fetching articles:', error);
            return []
        }
    };

    const UploadNewArticle = async (newArticle: BlogArticle) => {
        let body = newArticle;
        let headers = mainInterface.jsonHeaders;
        const response = await axios.post(`${aspnetUrl}/api/Article/UploadNewArticle`, body, { headers }); // Replace 'controller-name' with your actual controller route
        console.log(response.data);
    }

    return { FetchAllArticles, UploadNewArticle };
}

export default ArticlesFunc;