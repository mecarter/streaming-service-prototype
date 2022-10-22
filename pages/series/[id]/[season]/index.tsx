import React, { FC, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import moment from 'moment'

import {
  chakra,
  Box,
  useDisclosure,
  Drawer,
  DrawerContent,
} from '@chakra-ui/react'

import EpisodeDrawer from '../../../../components/EpisodeDrawer'
import EpisodesSlider from '../../../../components/EpisodesSlider'

import { truncateText } from '../../../../utils'
import { EpisodeType } from '../../../../config/types'

// TODO: These should absolutely not be hard-coded
import EXAMPLE_SeasonImgSrc from '../../../../public/tt0106179--season5--bg-image.jpg'
import Episode5Img from '../../../../public/tt0106179--season5--episode5.jpg'
import Episode6Img from '../../../../public/tt0106179--season5--episode6.jpg'
import Episode7Img from '../../../../public/tt0106179--season5--episode7.jpg'
import Episode15Img from '../../../../public/tt0106179--season5--episode15.jpg'
import Episode17Img from '../../../../public/tt0106179--season5--episode17.jpg'
import Episode20Img from '../../../../public/tt0106179--season5--episode20.jpg'

const EPISODE_IMAGES = {
  5: Episode5Img,
  6: Episode6Img,
  7: Episode7Img,
  15: Episode15Img,
  17: Episode17Img,
  20: Episode20Img,
}

type SeriesSeasonPageProps = {
  plot: string
  season: string
  title: string
  episodes: EpisodeType[]
}

const SeriesSeasonPage: FC<SeriesSeasonPageProps> = ({
  episodes: episodesWithoutImages,
  plot,
  season,
  title,
}) => {
  const [activeEpisode, setActiveEpisode] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClickEpisode = (episodeNumber: string) => {
    setActiveEpisode(episodeNumber)
    if (!isOpen) onOpen()
  }

  const episodes: EpisodeType[] = episodesWithoutImages.map((episode) => ({
    ...episode,
    imageSrc: EPISODE_IMAGES[episode.episode],
  }))

  return (
    <>
      <Head>
        <title>{`Streaming Service - ${title} - Season ${season}`}</title>
      </Head>
      <Box position="relative" minHeight="100vh">
        {/* TODO: Season background image is hard-coded for now, but it should be dynamic! */}
        <Box
          position="absolute"
          top="0"
          left="0"
          zIndex="0"
          width="100vw"
          height={['60vh', '60vh', '100vh']}
          opacity="0.48"
          pointerEvents="none"
        >
          <Image
            alt={`Season ${season}`}
            layout="fill"
            objectFit="cover"
            priority
            src={EXAMPLE_SeasonImgSrc}
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100vw"
            height="20vh"
            background={[
              'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
              'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
              '',
            ]}
          />
        </Box>
        <Box
          paddingX="6.66vw"
          paddingTop="26.68vh"
          marginBottom={['8', '8', '0']}
          position="relative"
          zIndex="1"
        >
          <h3>Season {season}</h3>
          <h1>{title}</h1>
          <chakra.p
            fontSize="2xl"
            lineHeight="shorter"
            marginTop="-0.9rem"
            maxWidth="37ch"
          >
            {plot}
          </chakra.p>
        </Box>
        <EpisodesSlider
          activeEpisode={activeEpisode}
          isDrawerOpen={isOpen}
          episodes={episodes}
          onClickEpisode={handleClickEpisode}
        />
        <EpisodeDrawer
          episode={
            activeEpisode &&
            episodes.find(({ episode }) => episode === activeEpisode)
          }
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </>
  )
}

export default SeriesSeasonPage

export async function getStaticPaths() {
  return {
    paths: [
      // Raised By Wolves
      // { params: { id: 'tt9170108', season: '1' } },
      // The X-Files
      { params: { id: 'tt0106179', season: '5' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { id, season } = context.params

  // TODO: All of these API calls should have error handling so
  //       so we can have insight into why the build is failing
  //       if there is a problem with the API/data.

  // Fetch data about the Series
  const seriesApiCall = await fetch(
    `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`,
  )
  const { Title, Plot } = await seriesApiCall.json()

  // Fetch data about the Season, which includes all of the Episode numbers
  const episodesApiCall = await fetch(
    `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&Season=${season}`,
  )
  const { Episodes } = await episodesApiCall.json()

  // Fetch all Episodes in the Season and curate the data into something closer to what the UI needs
  const episodes = await Promise.all(
    Episodes.map(
      ({ Episode }) =>
        new Promise(async (resolve, reject) => {
          const episodeApiCall = await fetch(
            `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&Season=${season}&Episode=${Episode}`,
          )
          const {
            Episode: episode,
            Plot,
            Released,
            Title: title,
            imdbRating: rating,
          } = await episodeApiCall.json()

          resolve({
            date: moment(Released, 'DD MMM YYYY').format('YYYY-MM-DD'),
            description: truncateText(Plot || '', 80),
            episode,
            rating,
            title,
          })
        }),
    ),
  )

  // Curate and return the pertinent data to the Page props
  return {
    props: {
      episodes,
      plot: Plot,
      season,
      title: Title,
    },
  }
}
