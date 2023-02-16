<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;

final class UnAdoptedAnimalsFilter extends AbstractFilter
{
    protected function filterProperty(
        string $property,
        $value,
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        ?Operation $operation = null,
        array $context = []
    ): void {
        if ($property !== 'page') {
            return;
        }
        $queryBuilder->leftJoin('App\Entity\Adoption', 'ad', 'WITH', 'o.id=ad.animal')
            ->andWhere('ad.animal IS NULL');
    }

    public function getDescription(string $resourceClass): array
    {
        return [];
    }
}
