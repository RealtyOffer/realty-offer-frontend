import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';
import { Field, Form, Formik } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { doubleSpacer, decupleSpacer, tripleSpacer } from '../styles/size';
import {
  HeroImage,
  PageContainer,
  Seo,
  Box,
  Heading,
  Column,
  Row,
  Input,
  Button,
  HorizontalRule,
} from '../components';
import { fontSizeH6 } from '../styles/typography';
import useWindowSize from '../utils/useWindowSize';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import { addAlert } from '../redux/ducks/globalAlerts';
import { requiredEmail, requiredField, requiredPhoneNumber } from '../utils/validations';

type PartnerPageProps = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  title: string;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  heroHeading: string;
  heroSubheading: string;
  sectionOneHeading: string;
  sectionOneContent: string;
  youtubeVideoId: string;
  sectionTwoHeading: string;
  sectionTwoContent: string;
  sectionThreeHeading: string;
  sectionThreeContent: string;
  leadFormTitle: string;
  leadFormBody: string;
};

export const PartnerPageTemplate: FunctionComponent<PartnerPageProps> = (props) => {
  const size = useWindowSize();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    name: '',
    phone: '',
  };

  return (
    <>
      <Seo
        title={props.metaTitle}
        description={props.metaDescription}
        meta={[{ name: 'keywords', content: props.metaKeywords }]}
        image={props.heroImage.childImageSharp.fixed.src}
        imageWidth={props.heroImage.childImageSharp.fixed.width}
        imageHeight={props.heroImage.childImageSharp.fixed.height}
      />
      <HeroImage imgSrc={props.heroImage} mobileImgSrc={props.mobileHeroImage} hasOverlay>
        <PageContainer>
          <Row>
            <Column md={7}>
              <Heading styledAs="title">{props.heroHeading}</Heading>
              <Heading as="h6">
                <ReactMarkdown source={props.heroSubheading} />
              </Heading>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section style={{ padding: `${doubleSpacer} 0 ${decupleSpacer}` }}>
        <PageContainer>
          <Row>
            <Column md={8}>
              <Heading as="h1">{props.sectionOneHeading}</Heading>
              <div style={{ fontSize: fontSizeH6, columns: `24rem auto`, columnGap: tripleSpacer }}>
                <ReactMarkdown source={props.sectionOneContent} />
              </div>
              <br />
              <br />

              <LiteYoutubeEmbed
                id={props.youtubeVideoId}
                isMobile={Boolean(size.isSmallScreen)}
                lazyImage
              />
              <br />
              <br />
              <Heading as="h2" styledAs="title">
                Why Invest
              </Heading>
              <Heading as="h3" styledAs="subtitle">
                {props.sectionTwoHeading}
              </Heading>
              <div style={{ fontSize: fontSizeH6, columns: `24rem auto`, columnGap: tripleSpacer }}>
                <ReactMarkdown source={props.sectionTwoContent} />
              </div>
              <br />
              <br />

              <Heading as="h3" styledAs="subtitle">
                {props.sectionThreeHeading}
              </Heading>
              <div style={{ fontSize: fontSizeH6, columns: `24rem auto`, columnGap: tripleSpacer }}>
                <ReactMarkdown source={props.sectionThreeContent} />
              </div>
            </Column>
            <Column md={4}>
              <div style={{ position: 'sticky', top: 100 }}>
                <Box>
                  <Heading as="h3">{props.leadFormTitle}</Heading>
                  <p>{props.leadFormBody}</p>
                  <Formik
                    validateOnMount
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                      const valuesWithSubject = {
                        ...values,
                        subject: `New investors lead form submission from ${values.name} ${values.email}`,
                      };
                      postFormUrlEncoded('InvestorsLeadForm', valuesWithSubject)
                        .then(() => {
                          resetForm();
                          dispatch(
                            addAlert({
                              message: 'Thanks for your message. We will be in touch shortly!',
                              type: 'success',
                            })
                          );
                          if (window && window.analytics) {
                            window.analytics.track('Investors Lead Form completed', {
                              ...valuesWithSubject,
                            });
                          }
                        })
                        .catch(() => {
                          dispatch(
                            addAlert({
                              message: 'Something went wrong, please try again.',
                              type: 'danger',
                            })
                          );
                          if (window && window.analytics) {
                            window.analytics.track('Investors Lead Form failure', {
                              ...valuesWithSubject,
                            });
                          }
                        })
                        .finally(() => {
                          setSubmitting(false);
                        });
                    }}
                  >
                    {({ values, isSubmitting, isValid, setFieldValue }) => (
                      <Form
                        name="investorsLeadForm"
                        method="post"
                        netlify-honeypot="bot-field"
                        data-netlify="true"
                        onBlur={() =>
                          setFieldValue(
                            'subject',
                            `New investors lead form submission from ${values.name} ${values.email}`
                          )
                        }
                      >
                        <input type="hidden" name="form-name" value="contact" />

                        <Field
                          as={Input}
                          type="text"
                          name="name"
                          label="Full Name"
                          validate={requiredField}
                          required
                        />

                        <Field
                          as={Input}
                          type="tel"
                          name="phone"
                          label="Phone Number"
                          validate={requiredPhoneNumber}
                          required
                        />

                        <Field
                          as={Input}
                          type="email"
                          name="email"
                          label="Email"
                          validate={requiredEmail}
                          required
                        />

                        <HorizontalRule />
                        <Button
                          type="submit"
                          block
                          iconRight={<FaCaretRight />}
                          disabled={isSubmitting || !isValid}
                          isLoading={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting' : 'Submit'}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </div>
            </Column>
          </Row>
        </PageContainer>
      </section>
    </>
  );
};

const PartnerPage = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: PartnerPageProps; html: any } };
}) => {
  const { frontmatter } = data.markdownRemark;

  return <PartnerPageTemplate {...frontmatter} />;
};

export default PartnerPage;

export const partnerPageQuery = graphql`
  query PartnerPage {
    markdownRemark(frontmatter: { templateKey: { eq: "investors-page" } }) {
      html
      frontmatter {
        metaTitle
        metaDescription
        metaKeywords
        title
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2400, quality: 60) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1080, quality: 60) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        mobileHeroImage {
          childImageSharp {
            fluid(maxWidth: 512, quality: 40) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        heroHeading
        heroSubheading
        sectionOneHeading
        sectionOneContent
        youtubeVideoId
        sectionTwoHeading
        sectionTwoContent
        sectionThreeHeading
        sectionThreeContent
        leadFormTitle
        leadFormBody
      }
    }
  }
`;
