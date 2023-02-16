<?php

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;
use ApiPlatform\OpenApi\Model;

final class Auth implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated
    ) {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);
        $schemas = $openApi->getComponents()->getSchemas();

        $schemas['Auth'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'user' => [
                    'type' => 'object',
                    'readOnly' => true,
                ],
            ],
        ]);

        $openApi->getPaths()->addPath('/auth/user', new Model\PathItem(
            ref: 'User from JWT',
            get: new Model\Operation(
                tags: ['Login Check'],
                responses: [
                    '200' => [
                        'description' => 'Get JWT token',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Auth',
                                ],
                            ],
                        ],
                    ],
                ],
            )
            ));

        return $openApi;
    }
}
