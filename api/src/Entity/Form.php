<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use App\Filter\FormsForUnAdoptedAnimalsFilter;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
	operations: [
		new GetCollection(
			normalizationContext: [
				'groups' => 'form:collection:get',
				'datetime_format' => 'd.m.Y'
			],
			security: "is_granted('ROLE_ADMIN')",
		),
		new Post(
			denormalizationContext: [
				'groups' => 'form:collection:post',
			],
			security: "is_granted('ROLE_USER')",
		),
		new Get(
			normalizationContext: [
				'groups' => 'form:item:get',
				'datetime_format' => 'd.m.Y'
			],
			security: "is_granted('ROLE_USER') && object.user == user",
		),
		new Delete(
			security: "is_granted('ROLE_USER') && object.user == user",
		),
	],
	normalizationContext: [
		'groups' => [
			'form:collection:get',
			'form:item:get',
		],
		'datetime_format' => 'd.m.Y'
	],
	denormalizationContext: [
		'groups' => 'form:collection:post'
	]
)]
#[ApiResource(
	uriTemplate: '/forms/{animalId}/animals',
	uriVariables: [
		'animalId' => new Link(fromClass: Animal::class, toProperty: 'animal')
	],
	operations: [
		new GetCollection()
	],
	normalizationContext: [
		'groups' => [
			'form:collection:get',
			'form:item:get'
		],
		'datetime_format' => 'd.m.Y'
	],
	security: "is_granted('ROLE_ADMIN') || is_granted('ROLE_EMPLOYEE')"
)]
#[ApiResource(
	uriTemplate: '/forms/{userId}/users',
	uriVariables: [
		'userId' => new Link(fromClass: User::class, toProperty: 'user')
	],
	normalizationContext: [
		'groups' => [
			'form:collection:get',
			'form:item:get',
		],
		'datetime_format' => 'd.m.Y'
	],
	operations: [
		new GetCollection()
	],
	security: "is_granted('ROLE_ADMIN') || (is_granted('ROLE_USER') && object == user)",
)]
#[ORM\Entity()]
#[ApiFilter(FormsForUnAdoptedAnimalsFilter::class)]
class Form
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	#[Groups([
		'form:collection:get',
		'form:item:get'
	])]
	private ?int $id;

	#[ORM\Column(type: 'json', length: 10000)]
	#[Groups([
		'form:collection:post',
		'form:collection:get',
		'form:item:get',
		'user:collection:get',
		'user:item:get',
	])]
	private ?string $content;

	#[ORM\ManyToOne(
		targetEntity: FormScheme::class,
		inversedBy: 'forms'
	)]
	#[ORM\JoinColumn(
		name: 'form_scheme_id',
		referencedColumnName: 'id',
		nullable: false
	)]
	#[Groups([
		'form:collection:post',
		'form:collection:get',
		'form:item:get',
		'user:collection:get',
		'user:item:get',
	])]
	private FormScheme $formScheme;

	#[ORM\ManyToOne(
		targetEntity: User::class,
		inversedBy: 'forms'
	)]
	#[Groups([
		'form:collection:post',
		'form:collection:get',
		'form:item:get'
	])]
	private User $user;

	#[ORM\ManyToOne(
		targetEntity: Animal::class,
		inversedBy: 'forms',
	)]
	#[JoinColumn(
		name: 'animal_id',
		nullable: true,
		referencedColumnName: 'id'
	)]
	#[Groups([
		'form:collection:post',
		'form:collection:get',
		'form:item:get',
	])]
	private ?Animal $animal;

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
	 * Get the value of content
	 *
	 * @return ?string
	 */
	public function getContent(): ?string
	{
		return $this->content;
	}

	/**
	 * Set the value of content
	 *
	 * @param ?string $content
	 *
	 * @return self
	 */
	public function setContent(?string $content): self
	{
		$this->content = $content;

		return $this;
	}

	/**
	 * Get the value of formScheme
	 *
	 * @return FormScheme
	 */
	public function getFormScheme(): FormScheme
	{
		return $this->formScheme;
	}

	/**
	 * Set the value of formScheme
	 *
	 * @param FormScheme $formScheme
	 *
	 * @return self
	 */
	public function setFormScheme(FormScheme $formScheme): self
	{
		$this->formScheme = $formScheme;

		return $this;
	}

	/**
	 * Get the value of user
	 *
	 * @return User
	 */
	public function getUser(): User
	{
		return $this->user;
	}

	/**
	 * Set the value of user
	 *
	 * @param User $user
	 *
	 * @return self
	 */
	public function setUser(User $user): self
	{
		$this->user = $user;

		return $this;
	}

	/**
	 * Get the value of animal
	 */
	public function getAnimal()
	{
		return $this->animal;
	}

	/**
	 * Set the value of animal
	 *
	 * @return  self
	 */
	public function setAnimal($animal)
	{
		$this->animal = $animal;

		return $this;
	}
}
