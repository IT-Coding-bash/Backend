import { HttpException } from "@nestjs/common";
import { convertXML } from "simple-xml-to-json";

export async function xmlParser(xml: string) {
    const data = convertXML(xml);
    
    const header = data.ServiceResult.children[1].msgHeader.children[1].headerMsg.content;
    const body = data.ServiceResult.msgBody;

    console.log(body);

    if(header !== '정상적으로 처리되었습니다.'){
        return new HttpException(`API Error: ${header}`, 404);
    }
    
    return data.ServiceResult;
}