<?php

namespace App\Repository;

use App\Entity\MediaObject;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class MediaObjectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MediaObject::class);
    }

    public function getAnimalMainImage(int $animalId)
    {
        return $this->createQueryBuilder('m')
            ->where('m.domain = :animalId')
            ->andWhere('m.isMain = true')
            ->setParameter(':animalId', 'animal/' . $animalId)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
