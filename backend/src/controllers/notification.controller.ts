import { Request, Response } from "express";
import User from "../models/user";

function getMyNotifications(req:Request, res:Response): void {
    const getlength = req.body.getlength; 
    User.findById(req.user, {notifications : 1}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        if (getlength) return res.status(status).json({"length": data?.notifications.length});
        else return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

async function deleteNotification(type: string, destiny: string, origin: any, others?: string): Promise<any> {
    await User.findById(destiny, {notifications: 1}).then(data => {
        data?.notifications.forEach((notification) => {
            if(notification.type == type && notification.origin == origin){
                if (notification.type == "Queue"){
                    if (notification.others == others)
                        data.notifications.splice(data.notifications.indexOf(notification), 1);
                }

                else
                    data.notifications.splice(data.notifications.indexOf(notification), 1);
            }
        });
        return User.updateOne({"_id": destiny}, {$set: {notifications: data?.notifications}})
    })
}

async function delNotification(req: Request, res: Response){
    let notificationbody = req.body.notification;

   await User.findById(req.user, {notifications: 1}).then(data => {
    data?.notifications.forEach((notification) => {
        if(notification.type == notificationbody.type && notification.origin == notificationbody.origin){
            data.notifications.splice(data.notifications.indexOf(notification), 1);
            User.updateOne({"_id": req.user}, {$set: {notifications: data?.notifications}}).then(data => {
                return res.status(200).json(data);
            }, error => {
                return res.status(500).json(error);
            });
        }
    });
    }).catch((err) => {
        return res.status(500).json(err);
    });
}

export default { getMyNotifications, deleteNotification, delNotification };
