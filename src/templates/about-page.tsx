import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { FaCaretRight } from 'react-icons/fa';

import { baseSpacer, doubleSpacer, breakpoints, quadrupleSpacer } from '../styles/size';
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
import { brandPrimary, white } from '../styles/color';
import { requiredEmail, requiredField } from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import { fontSizeH6 } from '../styles/typography';

type AboutPageProps = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  title: string;
  content: any;
  mission: any;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  teamMembers: Array<{
    name: string;
    title: string;
    bio: any;
    avatar: { childImageSharp: { fluid: FluidObject } };
  }>;
};

const HeroBox = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  padding: ${baseSpacer};
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${doubleSpacer};
  }
`;

export const AboutPageTemplate: FunctionComponent<AboutPageProps> = (props) => {
  const dispatch = useDispatch();
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
      <HeroImage imgSrc={props.heroImage} mobileImgSrc={props.mobileHeroImage}>
        <PageContainer>
          <Row>
            <Column md={6} mdOffset={3}>
              <HeroBox>
                <Heading inverse>{props.title}</Heading>
              </HeroBox>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section style={{ padding: `${doubleSpacer} 0` }}>
        <PageContainer>
          <Heading as="h2">Our Mission</Heading>
          <div style={{ fontSize: fontSizeH6 }}>
            <ReactMarkdown source={props.mission} />
          </div>
        </PageContainer>
      </section>
      <section style={{ padding: `${quadrupleSpacer} 0`, backgroundColor: brandPrimary }}>
        <PageContainer>
          <div style={{ color: white }}>
            <Heading as="h3" inverse>
              The Objective of RealtyOffer
            </Heading>
            <ReactMarkdown source={props.content} />
          </div>
        </PageContainer>
      </section>
      {/* TODO: uncomment when ready <section style={{ padding: `${doubleSpacer} 0`, backgroundColor: brandTertiary }}>
        <PageContainer>
          <Heading as="h3" inverse>
            Team Members
          </Heading>
          <Row>
            {props.teamMembers.map((member) => (
              <Column xs={6} md={4} lg={3} key={member.name}>
                <Box>
                  <FlexContainer flexDirection="column">
                    <Avatar src={member.avatar} size="md" gravatarEmail="" bottomMargin />
                    <Heading as="h3" styledAs="title" noMargin>
                      {member.name}
                    </Heading>
                    <Heading as="h4" styledAs="subtitle">
                      {member.title}
                    </Heading>
                    <ReactMarkdown source={member.bio} />
                  </FlexContainer>
                </Box>
              </Column>
            ))}
          </Row>
        </PageContainer>
      </section> */}
      <section style={{ padding: `${doubleSpacer} 0` }}>
        <PageContainer>
          <Row>
            <Column md={6} mdOffset={3}>
              <Heading as="h3">Contact Us</Heading>
              <Box>
                <Formik
                  validateOnMount
                  initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    message: '',
                    subject: '',
                  }}
                  onSubmit={(values, { resetForm, setSubmitting }) => {
                    const valuesWithSubject = {
                      ...values,
                      subject: `New about page contact form submission from ${values.firstName} ${values.lastName}`,
                    };
                    postFormUrlEncoded('contact', valuesWithSubject)
                      .then(() => {
                        resetForm();
                        dispatch(
                          addAlert({
                            message: 'Thanks for your message. We will be in touch shortly!',
                            type: 'success',
                          })
                        );
                        if (window && window.analytics) {
                          window.analytics.track(`About Page Contact Form completed`, {
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
                          window.analytics.track(`About Page Contact Form failure`, {
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
                      name="aboutPageContact"
                      method="post"
                      netlify-honeypot="bot-field"
                      data-netlify="true"
                      onBlur={() =>
                        setFieldValue(
                          'subject',
                          `New about page contact form submission from ${values.firstName} ${values.lastName}`
                        )
                      }
                    >
                      <input type="hidden" name="form-name" value="aboutPageContact" />
                      <Row>
                        <Column sm={6}>
                          <Field
                            as={Input}
                            type="text"
                            name="firstName"
                            label="First Name"
                            validate={requiredField}
                            required
                          />
                        </Column>
                        <Column sm={6}>
                          <Field
                            as={Input}
                            type="text"
                            name="lastName"
                            label="Last Name"
                            validate={requiredField}
                            required
                          />
                        </Column>
                        <Column sm={6}>
                          <Field as={Input} type="tel" name="phone" label="Phone Number" />
                        </Column>
                        <Column sm={6}>
                          <Field
                            as={Input}
                            type="email"
                            name="email"
                            label="Email"
                            validate={requiredEmail}
                            required
                          />
                        </Column>
                      </Row>
                      <Field
                        as={Input}
                        type="textarea"
                        name="message"
                        label="Message"
                        validate={requiredField}
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
            </Column>
          </Row>
        </PageContainer>
      </section>
    </>
  );
};

const AboutPage = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: AboutPageProps; html: any } };
}) => {
  const { markdownRemark: post } = data;

  return (
    <AboutPageTemplate
      metaTitle={post.frontmatter.metaTitle}
      metaDescription={post.frontmatter.metaDescription}
      metaKeywords={post.frontmatter.metaKeywords}
      title={post.frontmatter.title}
      mission={post.frontmatter.mission}
      content={post.frontmatter.content}
      heroImage={post.frontmatter.heroImage}
      mobileHeroImage={post.frontmatter.mobileHeroImage}
      teamMembers={post.frontmatter.teamMembers}
    />
  );
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
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
        mission
        content
        teamMembers {
          name
          title
          bio
          avatar {
            childImageSharp {
              fluid(maxWidth: 300, quality: 60) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
