<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: [
                'groups' => 'site_meta:collection:get'
            ]
        ),
        new Post(
            denormalizationContext: [
                'groups' => 'site_meta:collection:post'
            ],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Put(
            denormalizationContext: [
                'groups' => 'site_meta:item:put'
            ],
            security: "is_granted('ROLE_ADMIN')"
        )
    ]
)]
#[ORM\Entity()]
class SiteMeta
{
    #[ORM\Id]
    #[ORM\Column(type: 'string')]
    #[Groups([
        'site_meta:collection:post',
        'site_meta:collection:get'
    ])]
    private string $metaKey;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups([
        'site_meta:collection:post',
        'site_meta:collection:get',
        'site_meta:item:put'
    ])]
    private ?string $stringValue;

	#[ORM\Column(type: 'json', nullable: true)]
    #[Groups([
        'site_meta:collection:post',
        'site_meta:collection:get',
        'site_meta:item:put'
    ])]
    private ?array $jsonValue;

    /**
     * Get the value of metaKey
     */
    public function getMetaKey()
    {
        return $this->metaKey;
    }

    /**
     * Set the value of metaKey
     *
     * @return  self
     */
    public function setMetaKey($metaKey)
    {
        $this->metaKey = $metaKey;

        return $this;
    }

    /**
     * Get the value of stringValue
     */
    public function getStringValue()
    {
        return $this->stringValue;
    }

    /**
     * Set the value of stringValue
     *
     * @return  self
     */
    public function setStringValue($stringValue)
    {
        $this->stringValue = $stringValue;

        return $this;
    }

    /**
     * Get the value of jsonValue
     */
    public function getJsonValue()
    {
        return $this->jsonValue;
    }

    /**
     * Set the value of jsonValue
     *
     * @return  self
     */
    public function setJsonValue($jsonValue)
    {
        $this->jsonValue = $jsonValue;

        return $this;
    }
}
