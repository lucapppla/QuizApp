import {Platform} from 'react-native';

export default class Helper{
    static getEndpoint(url){
        if(Platform.OS == "ios"){
            return "http://localhost:3000"+url;
        }
        return "http://10.0.2.2:3000"+url;
    }
}