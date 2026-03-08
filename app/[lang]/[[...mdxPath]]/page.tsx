import { generateStaticParamsFor, importPage } from 'nextra/pages'
import type { FC } from 'react'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  // Nextra maps content/<lang>/page.mdx to route "page", not ""
  const mdxPath = params.mdxPath?.length ? params.mdxPath : ['page']
  const { metadata } = await importPage(mdxPath, params.lang)
  return metadata
}

type PageProps = Readonly<{
  params: Promise<{
    mdxPath?: string[]
    lang: string
  }>
}>

const Wrapper = getMDXComponents().wrapper

const Page: FC<PageProps> = async props => {
  const params = await props.params
  // Nextra maps content/<lang>/page.mdx to route "page", not ""
  const mdxPath = params.mdxPath?.length ? params.mdxPath : ['page']
  const result = await importPage(mdxPath, params.lang)
  const { default: MDXContent, toc, metadata, sourceCode } = result
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}

export default Page