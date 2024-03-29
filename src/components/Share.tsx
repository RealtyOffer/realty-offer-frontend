import React, { FunctionComponent } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  // PinterestIcon,
  // PinterestShareButton,
  // RedditIcon,
  // RedditShareButton,
  // TelegramIcon,
  // TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import styled from 'styled-components';

import { z1Shadow } from '../styles/mixins';
import { white } from '../styles/color';
import { baseSpacer, borderRadius, halfSpacer, quarterSpacer } from '../styles/size';

type ShareProps = {
  url: string;
  title: string;
  tags: Array<string>;
  vertical?: boolean;
  media: string;
  description: string;
};

const ShareWrapper = styled.div`
  margin-bottom: ${baseSpacer};
  & button,
  & small {
    margin-right: ${halfSpacer};
  }
`;

const VerticalShareWrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  height: 270px; /* height of rendered div */
  margin-top: -135px; /* half of above */
  top: 50%;
  width: 40px;
  background: ${white};
  padding: ${quarterSpacer};
  box-shadow: ${z1Shadow};
  border-radius: 0 ${borderRadius} ${borderRadius} 0;

  & button {
    margin-bottom: ${quarterSpacer};
  }
`;

const Share: FunctionComponent<ShareProps> = ({
  url,
  title,
  tags,
  vertical,
  // media,
  // description,
}) => {
  const shareUrl = `https://realtyoffer.com${url}`;

  const hashtags = tags.map((tag) => tag.split(' ').join(''));

  const renderIcons = () => {
    return (
      <>
        <FacebookShareButton
          url={shareUrl}
          hashtag={tags && tags.length > 0 ? hashtags[0] : undefined}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton url={shareUrl} redirectUri={shareUrl} appId="335885727718265">
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          hashtags={tags && tags.length > 0 ? hashtags : undefined}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>{' '}
        {/* <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton> */}
        {/* <RedditShareButton url={shareUrl} title={title}>
          <RedditIcon size={32} round bgStyle={{ fill: '#FF4500' }} />
        </RedditShareButton> */}
        {/* <PinterestShareButton
          url={shareUrl}
          media={`https://realtyoffer.com${media}`}
          description={description}
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton> */}
        <EmailShareButton
          url={shareUrl}
          subject={`Check out this article on Packup: ${title}`}
          body="Hey, I thought you might be interested in this article on Packup that I found!"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </>
    );
  };

  return vertical ? (
    <VerticalShareWrapper>{renderIcons()}</VerticalShareWrapper>
  ) : (
    <ShareWrapper>{renderIcons()}</ShareWrapper>
  );
};

export default Share;
