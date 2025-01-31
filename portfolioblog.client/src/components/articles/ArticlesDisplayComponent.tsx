import * as React from 'react'
import { useEffect } from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';
//@ts-ignore
import axios from 'axios';
import { aspnetUrl } from '../../environment/environment';
import { deepClone } from '../../utility/deepClone';
import { WindowDisplayEnum } from '../../models/window-display/window-display-emum';
import { BlogArticle } from '../../models/blog/blog-article/BlogArticle';

const ArticlesDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    useEffect(() => {
        console.log('ArticlesDisplayComponent mounted');
        FetchAllArticles();

    }, []);

    const setSingleArticle = (article: BlogArticle) => {
        console.log(`setting single article`)
        let copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.singleArticle;
        copyMain.articleObject.singleArticle = article;
        setMainInterface(copyMain);
    }

    const FetchAllArticles = async () => {
        try {
            const response = await axios.get(`${aspnetUrl}/api/Article/GetAllArticles`); // Replace 'controller-name' with your actual controller route
            console.log(response.data);

            let copyMain = deepClone(mainInterface);
            copyMain.articleObject.articles = response.data;
            copyMain.articleObject.articles.sort((a: BlogArticle, b: BlogArticle) => b.rank - a.rank);
            setMainInterface(copyMain);

            //setArticles(response.data); // Assuming response data is the list of articles
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    //const articlesDivs = mainInterface.articleObject.articles.map((article: BlogArticle) => (
    //    <div key={article.id} style={{ height: "160px", backgroundColor: "darkgray", margin: "5px", width: "32%" }}>
    //        <h5>{article.title}</h5>
    //    </div>
    //));
    const articlesDivs = mainInterface.articleObject.articles.map((article: BlogArticle) => (
        <div
            key={article.id}
            style={{
                height: "160px",
                //backgroundImage: `url(${require(`../../assets/blog-pictures/${article.photoPath}`)})`,
                backgroundImage: `url(../../src/assets/blog-pictures/${article.photoPath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                margin: "5px",
                width: "32%",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            className="article-tile"
            onClick={() => setSingleArticle(article)}
        >
            <h5 style={{
                textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'
            }}>
                {article.title}
            </h5>
        </div>
    ));


    return (
        <div>
            
            <div className="row d-flex">
                <div className="col-sm-10 justify-content-between mx-auto">
                    <div className="row">
                        {articlesDivs}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ArticlesDisplayComponent;