<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\AdoptionProvider;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
	operations: [
		new GetCollection(
			normalizationContext: [
				'groups' => 'adoption:collection:get',
				'datetime_format' => 'd.m.Y'
			],
		),
		new Post(
			denormalizationContext: [
				'groups' => 'adoption:collection:post'
			],
		),
		new Get(
			normalizationContext: [
				'groups' => 'adoption:item:get',
				'datetime_format' => 'd.m.Y'
			],
			provider: AdoptionProvider::class,
			security: "is_granted('ROLE_ADMIN') || (is_granted('ROLE_USER') && object.user == user)"
		),
		new Put(
			denormalizationContext: [
				'groups' => 'adoption:item:put'
			],
			provider: AdoptionProvider::class,
		),
		new Delete(
			provider: AdoptionProvider::class,
		),
	],
	security: "is_granted('ROLE_ADMIN')",
	normalizationContext: [
		'groups' => [
			'adoption:collection:get',
			'adoption:item:get'
		]
	],
	denormalizationContext: [
		'groups' => [
			'adoption:collection:post',
			'adoption:item:put'
		]
	],
)]
#[ORM\Entity()]
#[ApiFilter(OrderFilter::class, properties: ['date' => 'ASC'])]
class Adoption
{
	#[ORM\Id]
	#[ORM\ManyToOne(
		targetEntity: User::class,
		inversedBy: 'adoptions'
	)]
	#[ORM\JoinColumn(
		name: 'user_id',
		referencedColumnName: 'id',
		nullable: false
	)]
	#[Groups([
		'adoption:collection:get',
		'adoption:item:get',
		'adoption:collection:post',
	])]
	#[ApiProperty(identifier: false)]
	private User $user;

	#[ORM\Id]
	#[ORM\ManyToOne(
		targetEntity: Animal::class,
		inversedBy: 'adoptions'
	)]
	#[Groups([
		'adoption:collection:get',
		'adoption:item:get',
		'adoption:collection:post',
		'user:collection:get',
		'user:item:get',
	])]
	#[ApiProperty(identifier: false)]
	private Animal $animal;

	#[ORM\Column(type: 'date')]
	#[Assert\NotNull()]
	#[Groups([
		'adoption:collection:get',
		'adoption:item:get',
		'adoption:collection:post',
		'adoption:item:put',
		'user:collection:get',
		'user:item:get',
	])]
	private DateTimeInterface $date;

	#[ApiProperty(identifier: true)]
	public function getId()
	{
		return $this->user->getId() . '-' . $this->animal->getId();
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
	 *
	 * @return Animal
	 */
	public function getAnimal(): Animal
	{
		return $this->animal;
	}

	/**
	 * Set the value of animal
	 *
	 * @param Animal $animal
	 *
	 * @return self
	 */
	public function setAnimal(Animal $animal): self
	{
		$this->animal = $animal;

		return $this;
	}

	/**
	 * Get the value of date
	 *
	 * @return DateTimeInterface
	 */
	public function getDate(): DateTimeInterface
	{
		return $this->date;
	}

	/**
	 * Set the value of date
	 *
	 * @param DateTimeInterface $date
	 *
	 * @return self
	 */
	public function setDate(DateTimeInterface $date): self
	{
		$this->date = $date;

		return $this;
	}
}
