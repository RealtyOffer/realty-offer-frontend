import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { FaChevronCircleUp, FaChevronCircleDown } from 'react-icons/fa';

import {
  Box,
  Button,
  FlexContainer,
  HeroImage,
  Heading,
  PageContainer,
  Seo,
  HorizontalRule,
} from '../components';

import { doubleSpacer } from '../styles/size';
import { lightestGray } from '../styles/color';

type FAQPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  consumerFaq: {
    items: Array<{
      question: string;
      answer: any;
    }>;
  };
  agentFaq: {
    items: Array<{
      question: string;
      answer: any;
    }>;
  };
};

const HeroBox = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: ${doubleSpacer};
`;

export const FAQPageTemplate: FunctionComponent<FAQPageProps> = ({
  heroImage,
  title,
  heroHeading,
  heroSubheading,
  consumerFaq,
  agentFaq,
}) => (
  <div>
    <Seo title={title} />
    <HeroImage src={heroImage.childImageSharp.fluid.src} height="500px">
      <PageContainer>
        <FlexContainer justifyContent="start">
          <HeroBox>
            <Heading inverse>{heroHeading}</Heading>
            <Heading inverse as="h2">
              {heroSubheading}
            </Heading>
            <Button type="link" to="/landing">
              Get Started
            </Button>
          </HeroBox>
        </FlexContainer>
      </PageContainer>
    </HeroImage>
    <section style={{ marginTop: '-100px', marginBottom: 50 }} id="start">
      <PageContainer>
        <Box>
          <Heading styledAs="title">Frequently Asked Questions (FAQs)</Heading>
          <br />
          <Heading as="h2" styledAs="subtitle">
            Consumers looking to buy or sell FAQs
          </Heading>
          <HorizontalRule />
          <Accordion allowZeroExpanded>
            {consumerFaq.items.map((item) => (
              <AccordionItem key={item.question}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <FlexContainer justifyContent="space-between" alignItems="center">
                      <Heading as="h6" noMargin>
                        {item.question}
                      </Heading>
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded ? (
                            <FaChevronCircleUp color={lightestGray} size={doubleSpacer} />
                          ) : (
                            <FaChevronCircleDown color={lightestGray} size={doubleSpacer} />
                          )
                        }
                      </AccordionItemState>
                    </FlexContainer>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ReactMarkdown source={item.answer} />
                </AccordionItemPanel>
                <HorizontalRule />
              </AccordionItem>
            ))}
          </Accordion>
          <br />
          <Heading as="h2" styledAs="subtitle">
            Agent FAQs
          </Heading>
          <HorizontalRule />
          <Accordion allowZeroExpanded>
            {agentFaq.items.map((item) => (
              <AccordionItem key={item.question}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <FlexContainer justifyContent="space-between" alignItems="center">
                      <Heading as="h6" noMargin>
                        {item.question}
                      </Heading>
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded ? (
                            <FaChevronCircleUp color={lightestGray} size={doubleSpacer} />
                          ) : (
                            <FaChevronCircleDown color={lightestGray} size={doubleSpacer} />
                          )
                        }
                      </AccordionItemState>
                    </FlexContainer>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ReactMarkdown source={item.answer} />
                </AccordionItemPanel>
                <HorizontalRule />
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </PageContainer>
    </section>
  </div>
);

const FAQPage = ({ data }: { data: { markdownRemark: { frontmatter: FAQPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <FAQPageTemplate
      heroImage={frontmatter.heroImage}
      title={frontmatter.title}
      heroHeading={frontmatter.heroHeading}
      heroSubheading={frontmatter.heroSubheading}
      consumerFaq={frontmatter.consumerFaq}
      agentFaq={frontmatter.agentFaq}
    />
  );
};

export default FAQPage;

export const pageQuery = graphql`
  query FAQPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "frequently-asked-questions" } }) {
      frontmatter {
        title
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heroHeading
        heroSubheading
        consumerFaq {
          items {
            question
            answer
          }
        }
        agentFaq {
          items {
            question
            answer
          }
        }
      }
    }
  }
`;
