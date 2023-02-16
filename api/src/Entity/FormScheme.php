<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
	operations: [
		new GetCollection(
			normalizationContext: [
				'groups' => 'form_scheme:collection:get'
			]
		),
		new Post(
			denormalizationContext: [
				'groups' => 'form_scheme:collection:post'
			],
			security: "is_granted('ROLE_ADMIN')"
		),
		new Get(
			normalizationContext: [
				'groups' => 'form_scheme:item:get'
			]
		),
	],
	security: "is_granted('ROLE_USER')",
	normalizationContext: [
		'groups' => [
			'form_scheme:collection:get',
			'form_scheme:item:get'
		]
	],
	denormalizationContext: [
		'groups' => 'form_scheme:collection:post'
	]
)]
#[ORM\Entity()]
class FormScheme
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	#[Groups([
		'form_scheme:collection:get',
		'form_scheme:item:get'
	])]
	private ?int $id;

	#[ORM\Column(type: 'string', length: 255)]
	#[Groups([
		'form_scheme:collection:get',
		'form_scheme:item:get',
		'form_scheme:collection:post',
		'user:collection:get',
		'user:item:get',
	])]
	private string $name;

	#[ORM\Column(type: 'json', length: 10000)]
	#[Groups([
		'form_scheme:collection:get',
		'form_scheme:item:get',
		'form_scheme:collection:post',
		'user:collection:get',
		'user:item:get',
	])]
	private string $content;

	#[ORM\OneToMany(
		mappedBy: 'formScheme',
		targetEntity: Form::class,
		cascade: ['persist']
	)]
	#[Groups([
		'form_scheme:collection:get',
		'form_scheme:item:get',
	])]
	private Collection $forms;

	public function __construct()
	{
		$this->forms = new ArrayCollection();
	}

	/**
	 * Get the value of id
	 *
	 * @return ?int
	 */
	public function getId(): ?int
	{
		return $this->id;
	}

	/**
	 * Set the value of id
	 *
	 * @param ?int $id
	 *
	 * @return self
	 */
	public function setId(?int $id): self
	{
		$this->id = $id;

		return $this;
	}

	/**
	 * Get the value of name
	 *
	 * @return string
	 */
	public function getName(): string
	{
		return $this->name;
	}

	/**
	 * Set the value of name
	 *
	 * @param string $name
	 *
	 * @return self
	 */
	public function setName(string $name): self
	{
		$this->name = $name;

		return $this;
	}

	/**
	 * Get the value of content
	 *
	 * @return string
	 */
	public function getContent(): string
	{
		return $this->content;
	}

	/**
	 * Set the value of content
	 *
	 * @param string $content
	 *
	 * @return self
	 */
	public function setContent(string $content): self
	{
		$this->content = $content;

		return $this;
	}

	/**
	 * Get the value of forms
	 *
	 * @return Collection
	 */
	public function getForms(): Collection
	{
		return $this->forms;
	}
}
