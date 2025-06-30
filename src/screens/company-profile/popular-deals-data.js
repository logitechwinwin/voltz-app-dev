const DATA = [
  {
    id: 1,
    img: "https://s3-alpha-sig.figma.com/img/0420/79e4/1d8679621f073fcb551b0c56d6210086?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=krbzTae9mObRp2504n43Ty91vCxsy5KeCuarP9CYX6i5I0TWPHg6vcfIwXsFOv-x5t99cv1zc96k8s-gFQuWgsj5HXFjafdm6xYo2p~XLBzAglapBoQjOE2r3iuZ-1JBT~dzUqeRgk2rBhcAPU2sw2liQLdqcj~AHvTPUgEmZpaEFuPHPQ~LdKKdWbxa6DLpMfZh7yNneUQSyRfeZeh2A9uPwq3urXX~wVGu6F3O3gsdNreYqjwudrGKXJZjH4J59UEGE22zoHmk~c49RmUnknmdb9m8tDQqhjS7MA8Ee10CwFvW3kSXqjQoOIJz6-zwTKSo6KQS2KxQKhPkMHRy~g__",
    coverImg:
      "https://s3-alpha-sig.figma.com/img/dbc4/f92d/0798c4b25ad1bbc823038635311b3cf5?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bCyV3qdN982sVip~e1W8n6ZfKbsCcT6mm~KcWIABcTfWxPkNYXIeNflJLrv6tmMJddzawuhtIazvqtpxZaJA4PGuz4nT3Gpe7M-KcLGtPjob95nXhviJcrdXzkoDRYY41O7cv1o-OE8-KS41mJIQNXSqj3eGnhNEaMuoRJ83EozloF8lbkZy4lyp1OCwPpCP52fzes1uS~7DugilB~zxlHlTrDUH2eJn67z~woNn1HzkNAO7bOMHY0VvygYN9fokxOTSEKplyY~ffncVrB5xqCBzQzGkHtzRwvLhpDr3f2vard-dE7Vk3rCKTpSIZlmek1GQipVtiAkDm1Jk7HBfDQ__",
    title: "Fruit & Vegetables Deal",
    point: 5,
    catagory: "Grocery",
  },
  {
    id: 2,
    img: "https://s3-alpha-sig.figma.com/img/0420/79e4/1d8679621f073fcb551b0c56d6210086?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=krbzTae9mObRp2504n43Ty91vCxsy5KeCuarP9CYX6i5I0TWPHg6vcfIwXsFOv-x5t99cv1zc96k8s-gFQuWgsj5HXFjafdm6xYo2p~XLBzAglapBoQjOE2r3iuZ-1JBT~dzUqeRgk2rBhcAPU2sw2liQLdqcj~AHvTPUgEmZpaEFuPHPQ~LdKKdWbxa6DLpMfZh7yNneUQSyRfeZeh2A9uPwq3urXX~wVGu6F3O3gsdNreYqjwudrGKXJZjH4J59UEGE22zoHmk~c49RmUnknmdb9m8tDQqhjS7MA8Ee10CwFvW3kSXqjQoOIJz6-zwTKSo6KQS2KxQKhPkMHRy~g__",
    coverImg:
      "https://s3-alpha-sig.figma.com/img/dbc4/f92d/0798c4b25ad1bbc823038635311b3cf5?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bCyV3qdN982sVip~e1W8n6ZfKbsCcT6mm~KcWIABcTfWxPkNYXIeNflJLrv6tmMJddzawuhtIazvqtpxZaJA4PGuz4nT3Gpe7M-KcLGtPjob95nXhviJcrdXzkoDRYY41O7cv1o-OE8-KS41mJIQNXSqj3eGnhNEaMuoRJ83EozloF8lbkZy4lyp1OCwPpCP52fzes1uS~7DugilB~zxlHlTrDUH2eJn67z~woNn1HzkNAO7bOMHY0VvygYN9fokxOTSEKplyY~ffncVrB5xqCBzQzGkHtzRwvLhpDr3f2vard-dE7Vk3rCKTpSIZlmek1GQipVtiAkDm1Jk7HBfDQ__",
    title: "Grocery ",
    point: 5,
    catagory: "Grocery",
  },
  {
    id: 3,
    img: "https://s3-alpha-sig.figma.com/img/0420/79e4/1d8679621f073fcb551b0c56d6210086?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=krbzTae9mObRp2504n43Ty91vCxsy5KeCuarP9CYX6i5I0TWPHg6vcfIwXsFOv-x5t99cv1zc96k8s-gFQuWgsj5HXFjafdm6xYo2p~XLBzAglapBoQjOE2r3iuZ-1JBT~dzUqeRgk2rBhcAPU2sw2liQLdqcj~AHvTPUgEmZpaEFuPHPQ~LdKKdWbxa6DLpMfZh7yNneUQSyRfeZeh2A9uPwq3urXX~wVGu6F3O3gsdNreYqjwudrGKXJZjH4J59UEGE22zoHmk~c49RmUnknmdb9m8tDQqhjS7MA8Ee10CwFvW3kSXqjQoOIJz6-zwTKSo6KQS2KxQKhPkMHRy~g__",
    coverImg:
      "https://s3-alpha-sig.figma.com/img/dbc4/f92d/0798c4b25ad1bbc823038635311b3cf5?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bCyV3qdN982sVip~e1W8n6ZfKbsCcT6mm~KcWIABcTfWxPkNYXIeNflJLrv6tmMJddzawuhtIazvqtpxZaJA4PGuz4nT3Gpe7M-KcLGtPjob95nXhviJcrdXzkoDRYY41O7cv1o-OE8-KS41mJIQNXSqj3eGnhNEaMuoRJ83EozloF8lbkZy4lyp1OCwPpCP52fzes1uS~7DugilB~zxlHlTrDUH2eJn67z~woNn1HzkNAO7bOMHY0VvygYN9fokxOTSEKplyY~ffncVrB5xqCBzQzGkHtzRwvLhpDr3f2vard-dE7Vk3rCKTpSIZlmek1GQipVtiAkDm1Jk7HBfDQ__",
    title: "Clothing Cute cute si",
    point: 5,
    catagory: "Clothing",
  },
];

export default DATA;
