export interface Article {
    id: number;
    type: number;
    by: string;
    time: string;
    text: string;
    url: string;
    title: string;
  }

  export enum ArticleType {
    job,
    story, 
    comment, 
    poll,
    pollopt
  }

  export enum ArticleTypeIcon {
    rss_feed,  
    article,
    chat_bubble_outline, 
    poll,
    ballot
  }