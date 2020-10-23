import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Uppload, en, Local, Crop, fetchUploader } from 'uppload';
import 'uppload/dist/uppload.css';
import 'uppload/dist/themes/light.css';

import Button from './Button';
import Avatar from './Avatar';
import FlexContainer from './FlexContainer';
import { S3_PROXY_BY_KEY_ENDPOINT } from '../redux/constants';
import { RootState } from '../redux/ducks';
import { updateUserAvatar } from '../redux/ducks/user';

const FileUpload: FunctionComponent<{}> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const uploader = useMemo(
    () =>
      new Uppload({
        lang: en,
        defaultService: 'local',
        compression: 0,
        compressionToMime: 'image/jpeg',
        maxSize: [1024, 1024],
        uploader: fetchUploader({
          endpoint: S3_PROXY_BY_KEY_ENDPOINT('avatar.jpg'),
          settingsFunction: (file) => {
            return {
              method: 'PUT',
              body: file,
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
                'Content-Type': 'image/jpeg',
              },
            };
          },
        }),
      }),
    []
  );

  useEffect(() => {
    uploader.use([
      new Local({
        mimeTypes: ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'],
      }),
    ]);
    uploader.use([new Crop({ aspectRatio: 1 })]);
  }, [uploader]);

  uploader.on('before-upload', () => {
    setIsLoading(true);
  });

  uploader.on('upload', (newUrl: string) => {
    // add query param with date in milliseconds so it updates, since url is always the same
    dispatch(updateUserAvatar(`${newUrl}?${Date.now()}`));
    setIsLoading(false);
    uploader.close();
  });

  return (
    <FlexContainer flexDirection="column">
      <Avatar src={user.avatar} size="lg" gravatarEmail={auth.email} />
      <Button
        type="button"
        onClick={() => uploader.open()}
        color="text"
        isLoading={user.isLoading || isLoading}
      >
        Choose photo
      </Button>
    </FlexContainer>
  );
};

export default FileUpload;
