<?php

namespace App\Entity;

use ApiPlatform\Action\NotFoundAction;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\MediaObject\Create;
use App\Repository\MediaObjectRepository;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: MediaObjectRepository::class)]
#[ApiResource(
    types: ['https://schema.org/MediaObject'],
    operations: [
        new GetCollection(
            normalizationContext: [
                'groups' => 'media_object:collection:get'
            ]
        ),
        new Get(
            controller: NotFoundAction::class,
            read: false,
            output: false,
        ),
        new Put(
            denormalizationContext: [
                'groups' => 'media_object:item:put'
            ]
        ),
        new Post(
            controller: Create::class,
            deserialize: false,
            denormalizationContext: [
                'groups' => 'media_object:collection:post'
            ],
            validationContext: [
                'groups' => ['Default', 'media_object:create']
            ],
            security: "is_granted('ROLE_ADMIN') || is_granted('ROLE_EMPLOYEE')"
        )
    ],
    normalizationContext: [
        'groups' => [
            'media_object:collection:get'
        ]
    ],
    denormalizationContext: [
        'groups' => [
            'media_object:collection:post',
            'media_object:item:put'
        ]
    ],
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'domain' => 'exact'
    ],
)]
#[ApiFilter(
    BooleanFilter::class,
    properties: [
        'isMain'
    ]
)]
class MediaObject
{
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue()]
    private ?int $id;

    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups([
        'media_object:collection:get'
    ])]
    private ?string $contentUrl = null;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank()]
    private string $domain;

    #[Vich\UploadableField(mapping: "media_object", fileNameProperty: "filePath")]
    #[Assert\NotNull(groups: ['media_object:create'])]
    #[Assert\Image(maxSize: '5Mi')]
    private ?File $file = null;

    #[ORM\Column(nullable: true)]
    private ?string $filePath = null;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups([
        'media_object:item:put'
    ])]
    private ?bool $isMain = false;

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of contentUrl
     */
    public function getContentUrl()
    {
        return $this->contentUrl;
    }

    /**
     * Set the value of contentUrl
     *
     * @return  self
     */
    public function setContentUrl($contentUrl)
    {
        $this->contentUrl = $contentUrl;

        return $this;
    }

    /**
     * Get the value of file
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set the value of file
     *
     * @return  self
     */
    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    /**
     * Get the value of filePath
     */
    public function getFilePath()
    {
        return $this->filePath;
    }

    /**
     * Set the value of filePath
     *
     * @return  self
     */
    public function setFilePath($filePath)
    {
        $this->filePath = $filePath;

        return $this;
    }

    /**
     * Get the value of domain
     */
    public function getDomain()
    {
        return $this->domain;
    }

    /**
     * Set the value of domain
     *
     * @return  self
     */
    public function setDomain($domain)
    {
        $this->domain = $domain;

        return $this;
    }

    /**
     * Get the value of isMain
     */
    public function getIsMain()
    {
        return $this->isMain;
    }

    /**
     * Set the value of isMain
     *
     * @return  self
     */
    public function setIsMain($isMain)
    {
        $this->isMain = $isMain;

        return $this;
    }
}
