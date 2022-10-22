import React, { FC } from 'react'
import Image from 'next/image'

import { chakra, Box, Drawer, DrawerContent } from '@chakra-ui/react'

import { EpisodeType } from '../../config/types'

import IconStar from '../../public/icon--star.svg'

type EpisodeDrawerProps = {
  episode?: EpisodeType
  isOpen: boolean
  onClose: () => void
}

const EpisodeDrawer: FC<EpisodeDrawerProps> = ({
  episode,
  isOpen,
  onClose,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      {episode && (
        <DrawerContent
          sx={{
            color: 'black',
          }}
        >
          <Box
            height={['50vh', '50vh', 'calc(91.6vh - 234px)']}
            left="0"
            position="absolute"
            top="0"
            width="100%"
          >
            {episode.imageSrc && (
              <Image
                alt={episode.title}
                layout="fill"
                objectFit="cover"
                src={episode.imageSrc}
              />
            )}
          </Box>
          <Box
            bottom="0"
            height={['50vh', '50vh', 'calc(8.4vh + 234px)']}
            left="0"
            position="absolute"
          >
            <Box
              borderBottom="1px solid #EAEAEA"
              display={['block', 'block', 'flex']}
              fontSize="lg"
              justifyContent="space-between"
              padding="10"
              paddingBottom="8"
            >
              <Box marginBottom={['2', '2', '0']}>
                Episode {episode.episode} &mdash; {episode.date}
              </Box>
              <Box>
                <chakra.img
                  alt="Icon: star"
                  {...IconStar}
                  display="inline-block"
                  height="28px"
                  margin="-8px 20px 0 0"
                  verticalAlign="middle"
                  width="28px"
                />
                <strong>{episode.rating}</strong>/10
              </Box>
            </Box>
            <Box paddingX="10" paddingTop="12">
              <h2>{episode.title}</h2>
              <chakra.p fontSize="xl">{episode.description}</chakra.p>
            </Box>
          </Box>
        </DrawerContent>
      )}
    </Drawer>
  )
}

export default EpisodeDrawer
