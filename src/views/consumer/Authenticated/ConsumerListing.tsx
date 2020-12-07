import React, { useRef, FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FaFileDownload } from 'react-icons/fa';

import {
  Button,
  FlexContainer,
  Heading,
  ConsumerListingCard,
  Seo,
  LoadingPage,
} from '../../../components';
import { RootState } from '../../../redux/ducks';

type ConsumerListingProps = {} & RouteComponentProps;

const ConsumerListing: FunctionComponent<ConsumerListingProps> = () => {
  const consumer = useSelector((state: RootState) => state.consumer);
  const listing = useRef<HTMLDivElement>(null);

  const download = () => {
    if (listing.current) {
      html2canvas(listing.current, {
        backgroundColor: '#ffffff',
        scale: 0.75,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // eslint-disable-next-line new-cap
        const pdf = new jsPDF({
          unit: 'in',
        });
        pdf.text('RealtyOffer - My Listing Details', 0.75, 0.75);
        pdf.addImage(imgData, 'PNG', 0.75, 1.5, undefined, undefined, '', undefined, 0);

        pdf.save('RealtyOffer-Consumer-Contract.pdf');
      });

      // const doc = new jsPDF({
      //   unit: 'in',
      // });
      // doc.html(listing.current, {
      //   callback: (d) => d.save('my-listing'),
      //   margin: [0.75, 0.75, 0.75, 0.75],
      //   x: 0.75,
      //   y: 0.75,
      //   html2canvas: {
      //     width: 100,
      //   },
      // });
    }
  };

  return (
    <>
      <Seo title="My Listing" />
      <FlexContainer justifyContent="space-between">
        <Heading as="h2">My Listing</Heading>
        {consumer.winner && (
          <Button onClick={() => download()} type="button" iconLeft={<FaFileDownload />}>
            Download PDF
          </Button>
        )}
      </FlexContainer>
      <div ref={listing}>
        {consumer.isLoading ? <LoadingPage /> : <ConsumerListingCard consumer={consumer} />}
      </div>
    </>
  );
};

export default ConsumerListing;
