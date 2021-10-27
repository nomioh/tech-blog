const { Posts } = require("../models");

const postsData = [
  {
    title: "Responsive Web Design",
    post_url:
      "https://myprogrammingblog.com/2016/03/09/responsive-web-design-how-to-determine-device-resolution-to-target/",
    user_id: 5,
  },
  {
    title: "Programming Learned Faster in 7 Tips",
    post_url:
      "https://myprogrammingblog.com/2018/10/17/programming-learned-faster-7-tips/",
    user_id: 4,
  },
  {
    title: "Top 10 React Libraries to Check Out",
    post_url: "https://brainhub.eu/library/top-react-libraries/",
    user_id: 3,
  },
  {
    title:
      "How to Build a React Application with Load More Functionality using React Hooks",
    post_url:
      "https://www.freecodecamp.org/news/build-a-react-application-with-load-more-functionality-react-hooks/",
    user_id: 2,
  },
  {
    title: "What is an ORM and Why You Should Use it",
    post_url:
      "https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a",
    user_id: 1,
  },
];

const seedPosts = () => Posts.bulkcreate(postsData);
module.exports = seedPosts;
