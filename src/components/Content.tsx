import React from 'react'

interface ContentType {
  content: string
  className: string
}
export const HTMLContent = ({ className, content }: ContentType) => (
  // eslint-disable-next-line react/no-danger
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ className, content }: ContentType) => (
  <div className={className}>{content}</div>
)

export default Content
