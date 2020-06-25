import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-burger-builder-10b6a.firebaseio.com/'
}
);

export default instance;