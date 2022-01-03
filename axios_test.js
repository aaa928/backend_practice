import axios from "axios"

/////////////////////////////////////////////////////
// axios
// .get('https://jsonplaceholder.typicode.com/posts/1')
// .then(response => console.log(response.data))

/////////////////////////////////////////////////////
// axios({
//     method: 'post',
//     url: 'https://jsonplaceholder.typicode.com/posts',
//     data: {
//         userId: 99999,
//         title: 'test',
//         body: 'testttt'
//     }
//   })
//   .then((response) => console.log(response.data))
//   .catch(function (error) {
//     console.log(error.toJSON());
//   }
//   );

/////////////////////////////////////////////////////
// axios
//     .post('https://jsonplaceholder.typicode.com/posts', {
//         userId: 99999,
//         title: 'test2222',
//         body: 'testttt222'
//     })
//     .then((response) => console.log(response.data))
//     .catch(function (error) {
//         console.log(error.toJSON());
//     });

/////////////////////////////////////////////////////
// axios
//     .put('https://jsonplaceholder.typicode.com/posts/1', {
//         id: 1,
//         title: 'title_test',
//         body: 'body_test',
//         userId: 1,
//     })
//     .then((response) => console.log(response.data))
//     .catch(function (error) {
//         console.log(error.toJSON());
//     });

    
axios
    .delete('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => console.log(response.data))
    .catch(function (error) {
        console.log(error.toJSON());
    });