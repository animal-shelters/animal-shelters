<?php

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;

final class MediaObject implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated
    ) {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);

        $pathItem = $openApi->getPaths()->getPath('/media_objects');
        $operation = $pathItem->getPost();
        $openApi->getPaths()->addPath(
            '/media_objects',
            $pathItem->withPost(
                $operation->withRequestBody(
                    $operation
                        ->getRequestBody()
                        ->withContent(new \ArrayObject([
                            'multipart/form-data' => [
                                'schema' => [
                                    'type' => 'object',
                                    'required' => [
                                        'domain',
                                    ],
                                    'properties' => [
                                        'file' => [
                                            'type' => 'string',
                                            'format' => 'binary',
                                            'description' => 'Provide img file to upload file to server',
                                        ],
                                        'domain' => [
                                            'type' => 'string',
                                            'description' => 'MediaObject domain',
                                        ],
                                        'isMain' => [
                                            'type' => 'boolean',
                                            'description' => 'Is it main image'
                                        ]
                                    ],
                                ],
                            ],
                        ]))
                )
            )
        );
        $pathItem = $openApi->getPaths()->getPath('/media_objects/{id}');
        $openApi->getPaths()->addPath(
            '/media_objects/{id}',
            $pathItem->withGet(null)
        );
        
        return $openApi;
    }
}
