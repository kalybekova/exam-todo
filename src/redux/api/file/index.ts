import { api as index } from "..";


const api = index.injectEndpoints({
  endpoints: (built) => ({
    uploadFile: built.mutation<FILE.uploadFileResponse, FILE.uploadFileRequest>( {
        query: (data) => ({
          url: `/upload/file`,
          method: "POST",
          body: data,
        }),
      }
    ),
  }),
});

export const { useUploadFileMutation } = api;
