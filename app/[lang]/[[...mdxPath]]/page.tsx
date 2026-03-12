import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { notFound } from 'next/navigation'
import type { FC } from 'react'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  // Nextra maps content/<lang>/page.mdx to route "page", not ""
  const mdxPath = params.mdxPath?.length ? params.mdxPath : ['page']
  try {
    const { metadata } = await importPage(mdxPath, params.lang)
    return metadata
  } catch {
    try {
      const { metadata } = await importPage([...mdxPath, 'page'], params.lang)
      return metadata
    } catch {
      return {}
    }
  }
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
  // For folder index pages (e.g. /Learn), fall back to /Learn/page
  let mdxPath = params.mdxPath?.length ? params.mdxPath : ['page']
  let result
  try {
    result = await importPage(mdxPath, params.lang)
  } catch {
    try {
      result = await importPage([...mdxPath, 'page'], params.lang)
    } catch {
      return notFound()
    }
  }
  const { default: MDXContent, toc, metadata, sourceCode } = result
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}

export default Page