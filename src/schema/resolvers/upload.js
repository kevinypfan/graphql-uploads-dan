import path from 'path'

export default {
    Mutation: {
        singleUpload: (root, { file }, { processUpload, pubsub }) => {
            console.log(file)
            const uploadData = processUpload(path.resolve(__dirname, '../../uploads'), file)
            pubsub.publish('newUploadFile', { newUploadFile: { message: "new uploaded!", changedData: uploadData } });
            return uploadData
        }
    }
}