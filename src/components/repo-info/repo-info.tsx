import { Box, Chip, Rating, Stack, Typography } from '@mui/material';
import { TRepoNode } from '../../types/t-seach-repositories-response';
import { useMemo } from 'react';

export type TRepoInfoProps = {
    currentRepo: TRepoNode;
};

export const RepoInfo = ({ currentRepo }: TRepoInfoProps) => {
    const topics = useMemo(
        () =>
            currentRepo?.repositoryTopics?.nodes?.map(
                (node) => node.topic.name
            ),
        [currentRepo]
    );

    const language = currentRepo?.primaryLanguage?.name;

    return (
        <>
            <Typography variant="h4" sx={{ fontSize: '32px' }}>
                {currentRepo?.name}
            </Typography>

            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                {!!language ? (
                    <Chip
                        sx={{
                            color: 'text.disabled',
                            padding: '4px 4px 4px 4px',
                            backgroundColor: 'primary.main',
                            borderRadius: '100px',
                            height:'32px'
                        }}
                        label={String(language)}
                    />
                ) : (
                    <Box />
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Rating name="customized-1" defaultValue={1} max={1} />
                    <Typography variant="body2">
                        {currentRepo.stargazers.totalCount.toLocaleString()}
                    </Typography>
                </Box>
            </Stack>
            <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                {topics &&
                    topics.map((topic) => (
                        <Chip
                            label={topic}
                            sx={{
                                marginBottom: '8px',
                                marginRight: '8px',
                                opacity: 1,
                                color: 'text.secondary',
                                padding: '3px 4px 3px 4px',
                                borderRadius: '100px',
                                height: '24px'
                            }}
                        />
                    ))}
            </Stack>
            {currentRepo?.licenseInfo?.name && (
                <Typography variant="body2">
                    {currentRepo.licenseInfo.name}
                </Typography>
            )}
        </>
    );
};
